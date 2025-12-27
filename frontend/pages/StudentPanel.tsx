import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { User, FileText, Mail, Calendar, ChevronLeft, Play, Clock, CheckCircle } from 'lucide-react';
import { toPersianDigits } from '../utils';
import axios from 'axios';

interface TestResult {
  id: number;
  createdAt: string;
  calculated_scales: any;
}

const StudentPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tests' | 'profile' | 'message'>('tests');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    full_name_en: '',
    age: '',
    gender: 'male',
    education: '',
    marital_status: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }
    loadTestHistory();
    loadProfile();
  }, [user, navigate]);

  const loadTestHistory = async () => {
    try {
      const response = await axios.get('/api/student/test-history');
      if (response.data.success) {
        setTestResults(response.data.data || []);
      }
    } catch (error) {
      console.error('Error loading test history:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      if (response.data.success) {
        const data = response.data.data;
        setProfileForm({
          name: data.name || '',
          full_name_en: data.full_name_en || '',
          age: data.age?.toString() || '',
          gender: data.gender || 'male',
          education: data.education || '',
          marital_status: data.marital_status || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/student/profile', {
        ...profileForm,
        age: parseInt(profileForm.age) || null
      });
      alert('پروفایل با موفقیت به‌روزرسانی شد.');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('خطا در به‌روزرسانی پروفایل');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    try {
      await axios.post('/api/student/message', { message });
      setMessageSent(true);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('خطا در ارسال پیام');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return toPersianDigits(date.toLocaleDateString('fa-IR'));
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">پنل کاربری</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200">
            <User size={18} className="text-brand" />
            <span className="font-bold">{user.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 bg-brand text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User size={32} />
                </div>
                <h3 className="font-bold">{user.name}</h3>
                <p className="text-sm text-brand-light">{user.phone}</p>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-colors ${
                    activeTab === 'tests' ? 'bg-brand-light text-brand' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FileText size={20} />
                  آزمون میلون
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-colors ${
                    activeTab === 'profile' ? 'bg-brand-light text-brand' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User size={20} />
                  پروفایل
                </button>
                <button
                  onClick={() => setActiveTab('message')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right font-medium transition-colors ${
                    activeTab === 'message' ? 'bg-brand-light text-brand' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Mail size={20} />
                  ارسال پیام
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            
            {activeTab === 'tests' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="text-brand" size={24} />
                      آزمون میلون
                    </h2>
                    <Link to="/mcmi">
                      <Button className="gap-2">
                        <Play size={18} />
                        شروع آزمون جدید
                      </Button>
                    </Link>
                  </div>

                  {selectedTest ? (
                    <div>
                      <button 
                        onClick={() => setSelectedTest(null)}
                        className="flex items-center gap-2 text-brand font-medium mb-4 hover:underline"
                      >
                        <ChevronLeft size={18} />
                        بازگشت به لیست
                      </button>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-bold text-lg mb-4">نتیجه آزمون - {formatDate(selectedTest.createdAt)}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedTest.calculated_scales && Object.entries(selectedTest.calculated_scales).map(([key, value]) => (
                            <div key={key} className="bg-white p-3 rounded-lg border border-gray-200">
                              <span className="text-xs text-gray-500 block">{key}</span>
                              <span className="text-lg font-bold text-brand">{toPersianDigits(String(value))}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loading ? (
                        <div className="text-center py-12 text-gray-500">در حال بارگذاری...</div>
                      ) : testResults.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500 mb-4">شما هنوز آزمونی انجام نداده‌اید.</p>
                          <Link to="/mcmi">
                            <Button>شروع اولین آزمون</Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600 mb-4">
                            تعداد آزمون‌های انجام شده: <strong className="text-brand">{toPersianDigits(testResults.length)}</strong>
                          </p>
                          {testResults.map((test, index) => (
                            <button
                              key={test.id}
                              onClick={() => setSelectedTest(test)}
                              className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 flex items-center justify-between transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand-light text-brand rounded-full flex items-center justify-center font-bold">
                                  {toPersianDigits(index + 1)}
                                </div>
                                <div className="text-right">
                                  <h4 className="font-bold text-gray-900">آزمون میلون شماره {toPersianDigits(index + 1)}</h4>
                                  <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar size={14} />
                                    {formatDate(test.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <ChevronLeft size={20} className="text-gray-400" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="text-brand" size={24} />
                  ویرایش پروفایل
                </h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نام و نام خانوادگی (فارسی)</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">نام و نام خانوادگی (انگلیسی)</label>
                    <input
                      type="text"
                      dir="ltr"
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand text-left"
                      value={profileForm.full_name_en}
                      onChange={e => setProfileForm({ ...profileForm, full_name_en: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">سن</label>
                      <input
                        type="number"
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                        value={profileForm.age}
                        onChange={e => setProfileForm({ ...profileForm, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">جنسیت</label>
                      <select
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                        value={profileForm.gender}
                        onChange={e => setProfileForm({ ...profileForm, gender: e.target.value })}
                      >
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">تحصیلات</label>
                    <select
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                      value={profileForm.education}
                      onChange={e => setProfileForm({ ...profileForm, education: e.target.value })}
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="diploma">دیپلم</option>
                      <option value="bachelor">کارشناسی</option>
                      <option value="master">کارشناسی ارشد</option>
                      <option value="phd">دکتری</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">وضعیت تأهل</label>
                    <select
                      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                      value={profileForm.marital_status}
                      onChange={e => setProfileForm({ ...profileForm, marital_status: e.target.value })}
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="single">مجرد</option>
                      <option value="married">متأهل</option>
                      <option value="divorced">مطلقه</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    ذخیره تغییرات
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'message' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Mail className="text-brand" size={24} />
                  ارسال پیام به مدیریت
                </h2>
                
                {messageSent ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">پیام شما ارسال شد</h3>
                    <p className="text-gray-500 mb-6">به زودی با شما تماس خواهیم گرفت.</p>
                    <Button onClick={() => setMessageSent(false)}>ارسال پیام جدید</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">متن پیام</label>
                      <textarea
                        rows={6}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand resize-none"
                        placeholder="پیام خود را بنویسید..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      <Mail size={18} />
                      ارسال پیام
                    </Button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentPanel;
