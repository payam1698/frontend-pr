
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useComments } from '../context/CommentContext';
import { Course } from '../types';
import Button from '../components/Button';
import { CheckCircle, Trash2, Edit, Plus, BookOpen, MessageSquare, Star } from 'lucide-react';
import { toPersianDigits, formatPrice } from '../utils';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const { getPendingComments, approveComment, deleteComment } = useComments();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'comments' | 'courses'>('comments');
  
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

      </div>
    </div>
  );
};

export default AdminPanel;
