
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useComments } from '../context/CommentContext';
import { Course } from '../types';
import Button from '../components/Button';
import { CheckCircle, Trash2, Edit, Plus, BookOpen, MessageSquare, Star, Users, Phone, Calendar, ClipboardList, ChevronLeft, GraduationCap, Upload, X } from 'lucide-react';
import { toPersianDigits, formatPrice } from '../utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import McmiReportView from '../components/McmiReportView';
import PersianDatePicker from '../components/PersianDatePicker';

interface UserInfo {
  id: number;
  name: string;
  phone: string;
  role: string;
  full_name_en?: string;
  gender?: string;
  education?: string;
  marital_status?: string;
  father_name?: string;
  birth_place?: string;
  birth_date?: string;
  createdAt: string;
}

interface InstructorInfo {
  id: number;
  name: string;
  title?: string;
  experience?: string;
  courses_description?: string;
  image?: string;
  status: string;
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const { getPendingComments, approveComment, deleteComment } = useComments();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'comments' | 'courses' | 'users' | 'tests' | 'instructors'>('comments');
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  
  const [instructors, setInstructors] = useState<InstructorInfo[]>([]);
  const [instructorsLoading, setInstructorsLoading] = useState(false);
  const [isEditingInstructor, setIsEditingInstructor] = useState(false);
  const [editingInstructorId, setEditingInstructorId] = useState<number | null>(null);
  
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    phone: '',
    role: 'student',
    gender: '',
    education: '',
    marital_status: '',
    father_name: '',
    birth_place: '',
    birth_date: ''
  });
  const [instructorForm, setInstructorForm] = useState({
    name: '',
    title: '',
    experience: '',
    courses_description: '',
    status: 'active'
  });
  const [instructorImage, setInstructorImage] = useState<File | null>(null);
  const [instructorImagePreview, setInstructorImagePreview] = useState<string | null>(null);
  const instructorImageInputRef = useRef<HTMLInputElement>(null);
  
  // Course Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    instructorName: '',
    price: 0,
    category: 'تخصصی روان‌درمانی',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    durationHours: 0,
    mode: 'آنلاین'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/panel');
      return;
    }
  }, [user, navigate]);

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await axios.get('/api/admin/users');
      if (response.data.success) {
        setUsers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    loadInstructors();
    loadUsers();
    loadTestResults();
  }, []);

  const loadTestResults = async () => {
    setTestsLoading(true);
    try {
      const response = await axios.get('/api/admin/test-results');
      if (response.data.success) {
        setTestResults(response.data.data || []);
      }
    } catch (error) {
      console.error('Error loading test results:', error);
    } finally {
      setTestsLoading(false);
    }
  };

  const loadInstructors = async () => {
    setInstructorsLoading(true);
    try {
      const response = await axios.get('/api/admin/instructors');
      if (response.data.success) {
        setInstructors(response.data.data || []);
      }
    } catch (error) {
      console.error('Error loading instructors:', error);
    } finally {
      setInstructorsLoading(false);
    }
  };

  const resetInstructorForm = () => {
    setInstructorForm({
      name: '',
      title: '',
      experience: '',
      courses_description: '',
      status: 'active'
    });
    setInstructorImage(null);
    setInstructorImagePreview(null);
    setIsEditingInstructor(false);
    setEditingInstructorId(null);
  };

  const handleInstructorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInstructorImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructorImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInstructorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorForm.name) {
      alert('نام استاد الزامی است');
      return;
    }

    const formData = new FormData();
    Object.entries(instructorForm).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (instructorImage) {
      formData.append('image', instructorImage);
    }

    try {
      if (editingInstructorId) {
        await axios.put(`/api/admin/instructors/${editingInstructorId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('/api/admin/instructors', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      resetInstructorForm();
      loadInstructors();
    } catch (error) {
      console.error('Error saving instructor:', error);
      alert('خطا در ذخیره اطلاعات استاد');
    }
  };

  const handleEditInstructor = (instructor: InstructorInfo) => {
    setInstructorForm({
      name: instructor.name,
      title: instructor.title || '',
      experience: instructor.experience || '',
      courses_description: instructor.courses_description || '',
      status: instructor.status
    });
    if (instructor.image) {
      setInstructorImagePreview(instructor.image);
    }
    setEditingInstructorId(instructor.id);
    setIsEditingInstructor(true);
  };

  const handleEditUser = (u: UserInfo) => {
    setUserForm({
      name: u.name || '',
      phone: u.phone || '',
      role: u.role || 'student',
      gender: u.gender || '',
      education: u.education || '',
      marital_status: u.marital_status || '',
      father_name: u.father_name || '',
      birth_place: u.birth_place || '',
      birth_date: u.birth_date || ''
    });
    setEditingUserId(u.id);
    setIsEditingUser(true);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    try {
      await axios.put(`/api/admin/users/${editingUserId}`, {
        name: userForm.name,
        phone: userForm.phone,
        role: userForm.role,
        gender: userForm.gender || null,
        education: userForm.education || null,
        marital_status: userForm.marital_status || null,
        father_name: userForm.father_name || null,
        birth_place: userForm.birth_place || null,
        birth_date: userForm.birth_date || null
      });
      setIsEditingUser(false);
      setEditingUserId(null);
      loadUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('خطا در بروزرسانی کاربر');
    }
  };

  const handleDeleteInstructor = async (id: number) => {
    if (!confirm('آیا از حذف این استاد اطمینان دارید؟')) return;
    try {
      await axios.delete(`/api/admin/instructors/${id}`);
      loadInstructors();
    } catch (error) {
      console.error('Error deleting instructor:', error);
      alert('خطا در حذف استاد');
    }
  };

  // --- Comment Handlers ---
  const handleApproveComment = (id: string) => {
      approveComment(id);
  };

  const handleDeleteComment = (id: string) => {
      if(window.confirm('آیا از حذف این نظر اطمینان دارید؟')) {
          deleteComment(id);
      }
  };

  // --- Course CMS Handlers ---
  const handleEditCourse = (course: Course) => {
    setCourseForm(course);
    setEditingId(course.id);
    setIsEditing(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (window.confirm('آیا از حذف این دوره اطمینان دارید؟')) {
      deleteCourse(id);
    }
  };

  const resetForm = () => {
    setCourseForm({
      title: '',
      instructorName: '',
      price: 0,
      category: 'تخصصی روان‌درمانی',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      durationHours: 0,
      mode: 'آنلاین'
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && editingId) {
        updateCourse(editingId, courseForm);
    } else {
        const newCourse = {
            ...courseForm,
            id: 'c' + Date.now(),
            instructorId: '1', // Default for demo
            hasCertificate: true,
            isOnline: true,
            installmentsAvailable: false,
            rating: 5,
            description: 'توضیحات پیش‌فرض دوره جدید...',
            schedule: ['زمان‌بندی نشده'],
            syllabus: ['سرفصل ۱', 'سرفصل ۲']
        } as Course;
        addCourse(newCourse);
    }
    resetForm();
  };

  const pendingComments = getPendingComments();

  return (
    <div className="bg-gray-50 min-h-screen py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">پنل مدیریت سیستم</h1>
            <div className="text-sm text-gray-500">ادمین: {user?.name}</div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col sm:flex-row overflow-hidden">
            <button 
                onClick={() => setActiveTab('comments')}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'comments' ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <MessageSquare size={20} />
                مدیریت نظرات ({toPersianDigits(pendingComments.length)})
            </button>
            <button 
                onClick={() => setActiveTab('courses')}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'courses' ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <BookOpen size={20} />
                مدیریت دوره‌ها ({toPersianDigits(courses.length)})
            </button>
            <button 
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'users' ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <Users size={20} />
                مدیریت کاربران ({toPersianDigits(users.length)})
            </button>
            <button 
                onClick={() => setActiveTab('tests')}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'tests' ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <ClipboardList size={20} />
                نتایج آزمون‌ها ({toPersianDigits(testResults.length)})
            </button>
            <button 
                onClick={() => setActiveTab('instructors')}
                className={`flex-1 py-4 text-center font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'instructors' ? 'bg-brand text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
                <GraduationCap size={20} />
                مدیریت اساتید ({toPersianDigits(instructors.length)})
            </button>
        </div>

        {/* Content */}
        {activeTab === 'comments' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">نظرات در انتظار تأیید</h2>
                </div>
                {pendingComments.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        هیچ نظر جدیدی برای بررسی وجود ندارد.
                    </div>
                ) : (
                    <div className="space-y-4 p-6">
                        {pendingComments.map((comment) => (
                            <div key={comment.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold text-gray-900">{comment.userName}</span>
                                        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200">{comment.contentType === 'course' ? 'دوره آموزشی' : 'وبلاگ'}</span>
                                        {comment.rating && (
                                            <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                                <Star size={12} fill="currentColor" /> {comment.rating}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-400 mr-auto">{comment.createdAt}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{comment.text}</p>
                                </div>
                                <div className="flex gap-2 shrink-0 self-end md:self-center">
                                    <Button size="sm" onClick={() => handleApproveComment(comment.id)} className="bg-green-600 hover:bg-green-700 h-9 px-3">
                                        <CheckCircle size={16} className="ml-1" /> تأیید
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDeleteComment(comment.id)} className="text-red-600 hover:bg-red-50 border-red-200 h-9 px-3">
                                        <Trash2 size={16} className="ml-1" /> حذف
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {activeTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            {isEditing ? <Edit className="text-brand" size={20}/> : <Plus className="text-brand" size={20}/>}
                            {isEditing ? 'ویرایش دوره' : 'افزودن دوره جدید'}
                        </h2>
                        <form onSubmit={handleCourseSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">عنوان دوره</label>
                                <input 
                                    type="text" required
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={courseForm.title}
                                    onChange={e => setCourseForm({...courseForm, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">نام مدرس</label>
                                <input 
                                    type="text" required
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={courseForm.instructorName}
                                    onChange={e => setCourseForm({...courseForm, instructorName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">شهریه (تومان)</label>
                                <input 
                                    type="number" required
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={courseForm.price}
                                    onChange={e => setCourseForm({...courseForm, price: parseInt(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">مدت (ساعت)</label>
                                <input 
                                    type="number" required
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={courseForm.durationHours}
                                    onChange={e => setCourseForm({...courseForm, durationHours: parseInt(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">دسته‌بندی</label>
                                <select 
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={courseForm.category}
                                    onChange={e => setCourseForm({...courseForm, category: e.target.value})}
                                >
                                    <option value="تخصصی روان‌درمانی">تخصصی روان‌درمانی</option>
                                    <option value="روانشناسی کودک و نوجوان">روانشناسی کودک و نوجوان</option>
                                    <option value="مشاوره و کوچینگ">مشاوره و کوچینگ</option>
                                    <option value="سکس‌تراپی و اعتیاد">سکس‌تراپی و اعتیاد</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 flex gap-2">
                                <Button type="submit" className="w-full">
                                    {isEditing ? 'ذخیره تغییرات' : 'افزودن دوره'}
                                </Button>
                                {isEditing && (
                                    <Button type="button" variant="outline" onClick={resetForm} className="bg-gray-100">
                                        انصراف
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                         <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">لیست دوره‌های موجود</h2>
                            <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">{toPersianDigits(courses.length)} دوره</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {courses.map(course => (
                                <div key={course.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src={course.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{course.title}</h3>
                                            <p className="text-xs text-gray-500">{course.instructorName} | {toPersianDigits(course.durationHours)} ساعت</p>
                                            <p className="text-sm font-bold text-brand mt-1">{formatPrice(course.price)} تومان</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 self-end sm:self-center">
                                        <button 
                                            onClick={() => handleEditCourse(course)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                            title="ویرایش"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                            title="حذف"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'users' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">لیست کاربران</h2>
                    <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">{toPersianDigits(users.length)} کاربر</span>
                </div>
                
                {isEditingUser && (
                    <div className="p-6 border-b border-gray-200 bg-blue-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900">ویرایش کاربر</h3>
                            <button onClick={() => { setIsEditingUser(false); setEditingUserId(null); }} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUserSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام</label>
                                <input
                                    type="text"
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
                                <input
                                    type="text"
                                    value={userForm.phone}
                                    onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
                                <select
                                    value={userForm.role}
                                    onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                >
                                    <option value="student">دانشجو</option>
                                    <option value="admin">مدیر</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام پدر</label>
                                <input
                                    type="text"
                                    value={userForm.father_name}
                                    onChange={(e) => setUserForm({...userForm, father_name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">محل تولد</label>
                                <input
                                    type="text"
                                    value={userForm.birth_place}
                                    onChange={(e) => setUserForm({...userForm, birth_place: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ تولد (شمسی)</label>
                                <PersianDatePicker
                                    value={userForm.birth_date}
                                    onChange={(date) => setUserForm({...userForm, birth_date: date})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">جنسیت</label>
                                <select
                                    value={userForm.gender}
                                    onChange={(e) => setUserForm({...userForm, gender: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                >
                                    <option value="">انتخاب کنید</option>
                                    <option value="male">مرد</option>
                                    <option value="female">زن</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">تحصیلات</label>
                                <select
                                    value={userForm.education}
                                    onChange={(e) => setUserForm({...userForm, education: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                >
                                    <option value="">انتخاب کنید</option>
                                    <option value="زیر دیپلم">زیر دیپلم</option>
                                    <option value="دیپلم">دیپلم</option>
                                    <option value="کاردانی">کاردانی</option>
                                    <option value="کارشناسی">کارشناسی</option>
                                    <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                                    <option value="دکتری">دکتری</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت تأهل</label>
                                <select
                                    value={userForm.marital_status}
                                    onChange={(e) => setUserForm({...userForm, marital_status: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                                >
                                    <option value="">انتخاب کنید</option>
                                    <option value="مجرد">مجرد</option>
                                    <option value="متاهل">متاهل</option>
                                </select>
                            </div>
                            <div className="flex items-end lg:col-span-3 md:col-span-2">
                                <Button type="submit" className="w-full">ذخیره تغییرات</Button>
                            </div>
                        </form>
                    </div>
                )}
                
                {usersLoading ? (
                    <div className="p-12 text-center text-gray-500">
                        در حال بارگذاری...
                    </div>
                ) : users.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        هیچ کاربری یافت نشد.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {users.map(u => (
                            <div key={u.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${u.role === 'admin' ? 'bg-amber-500' : 'bg-brand'}`}>
                                        {u.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{u.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1">
                                                <Phone size={12} />
                                                {u.phone}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(u.createdAt).toLocaleDateString('fa-IR')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {u.role === 'admin' ? 'مدیر' : 'دانشجو'}
                                    </span>
                                    {u.gender && (
                                        <span className="text-xs text-gray-500">
                                            {u.gender === 'male' ? 'مرد' : u.gender === 'female' ? 'زن' : u.gender}
                                        </span>
                                    )}
                                    {u.age && (
                                        <span className="text-xs text-gray-500">
                                            {toPersianDigits(u.age)} سال
                                        </span>
                                    )}
                                    <button 
                                        onClick={() => handleEditUser(u)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                        title="ویرایش"
                                    >
                                        <Edit size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {activeTab === 'tests' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                {selectedTest ? (
                    <div className="p-6">
                        <McmiReportView 
                            testData={selectedTest} 
                            onBack={() => setSelectedTest(null)} 
                        />
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">نتایج آزمون‌های میلون</h2>
                            <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">{toPersianDigits(testResults.length)} نتیجه</span>
                        </div>
                        {testsLoading ? (
                            <div className="p-12 text-center text-gray-500">
                                در حال بارگذاری...
                            </div>
                        ) : testResults.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                هیچ نتیجه آزمونی یافت نشد.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {testResults.map((test: any) => (
                                    <button
                                        key={test.id}
                                        onClick={() => setSelectedTest(test)}
                                        className="w-full p-4 hover:bg-gray-50 transition-colors text-right"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                                                    {test.first_name?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">
                                                        {test.first_name} {test.last_name}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                        <span>{test.gender === 'male' ? 'مرد' : 'زن'}</span>
                                                        {test.age && <span>{toPersianDigits(test.age)} سال</span>}
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            {new Date(test.createdAt).toLocaleDateString('fa-IR')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {test.user && (
                                                    <span className="text-xs text-gray-500 block">
                                                        کاربر: {test.user.name} ({test.user.phone})
                                                    </span>
                                                )}
                                                <ChevronLeft size={20} className="text-gray-400" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        )}

        {activeTab === 'instructors' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form - Right side in RTL */}
                <div className="lg:col-span-1 lg:order-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            {editingInstructorId ? <Edit className="text-brand" size={20}/> : <Plus className="text-brand" size={20}/>}
                            {editingInstructorId ? 'ویرایش استاد' : 'افزودن استاد جدید'}
                        </h2>
                        <form onSubmit={handleInstructorSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">نام *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={instructorForm.name}
                                    onChange={e => setInstructorForm({ ...instructorForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">عنوان علمی</label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={instructorForm.title}
                                    onChange={e => setInstructorForm({ ...instructorForm, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">سوابق علمی و اجرایی</label>
                                <textarea
                                    rows={3}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand resize-none"
                                    value={instructorForm.experience}
                                    onChange={e => setInstructorForm({ ...instructorForm, experience: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">دوره‌ها و کارگاه‌های آموزشی</label>
                                <textarea
                                    rows={3}
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand resize-none"
                                    value={instructorForm.courses_description}
                                    onChange={e => setInstructorForm({ ...instructorForm, courses_description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">تصویر</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        ref={instructorImageInputRef}
                                        accept="image/*"
                                        onChange={handleInstructorImageChange}
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => instructorImageInputRef.current?.click()}
                                        className="gap-1"
                                    >
                                        <Upload size={16} />
                                        {instructorImagePreview ? 'تغییر' : 'آپلود'}
                                    </Button>
                                    {instructorImagePreview && (
                                        <img
                                            src={instructorImagePreview}
                                            alt="Preview"
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">وضعیت</label>
                                <select
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-brand focus:border-brand"
                                    value={instructorForm.status}
                                    onChange={e => setInstructorForm({ ...instructorForm, status: e.target.value })}
                                >
                                    <option value="active">فعال</option>
                                    <option value="inactive">غیرفعال</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <Button type="submit" className="w-full">
                                    {editingInstructorId ? 'ذخیره تغییرات' : 'افزودن استاد'}
                                </Button>
                                {editingInstructorId && (
                                    <Button type="button" variant="outline" onClick={resetInstructorForm} className="bg-gray-100">
                                        انصراف
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List - Left side in RTL */}
                <div className="lg:col-span-2 lg:order-1">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">لیست اساتید موجود</h2>
                            <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">{toPersianDigits(instructors.length)} استاد</span>
                        </div>
                        {instructorsLoading ? (
                            <div className="p-12 text-center text-gray-500">
                                در حال بارگذاری...
                            </div>
                        ) : instructors.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                هیچ استادی یافت نشد.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {instructors.map(instructor => (
                                    <div key={instructor.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-brand flex items-center justify-center text-white font-bold overflow-hidden border border-gray-200">
                                                {instructor.image ? (
                                                    <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    instructor.name?.charAt(0) || '?'
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{instructor.name}</h3>
                                                <p className="text-xs text-gray-500">{instructor.title || 'بدون عنوان'}</p>
                                                {instructor.experience && (
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{instructor.experience}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 self-end sm:self-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${instructor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {instructor.status === 'active' ? 'فعال' : 'غیرفعال'}
                                            </span>
                                            <button 
                                                onClick={() => handleEditInstructor(instructor)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                                                title="ویرایش"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteInstructor(instructor.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                                                title="حذف"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
