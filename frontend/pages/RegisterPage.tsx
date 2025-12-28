import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import PersianDatePicker from '../components/PersianDatePicker';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullNameFa: '',
    fullNameEn: '',
    fatherName: '',
    birthPlace: '',
    birthDate: '',
    gender: '' as '' | 'male' | 'female',
    education: '',
    maritalStatus: '',
    mobile: '',
    nationalCode: '',
    confirmNationalCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.nationalCode !== formData.confirmNationalCode) {
      setError('کد ملی و تکرار آن مطابقت ندارند.');
      return;
    }

    if (!formData.birthDate) {
      setError('لطفاً تاریخ تولد را وارد کنید.');
      return;
    }

    const userData = {
      name: formData.fullNameFa,
      fullNameEn: formData.fullNameEn,
      phone: formData.mobile,
      password: formData.nationalCode,
      gender: formData.gender,
      education: formData.education,
      maritalStatus: formData.maritalStatus,
      fatherName: formData.fatherName,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate
    };

    try {
      await register(userData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'خطا در برقراری ارتباط با سرور');
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ثبت نام با موفقیت انجام شد</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            نام کاربری شما: <strong className="text-gray-900 font-sans font-bold text-lg mx-1">{formData.mobile}</strong><br />
            رمز عبور شما: <strong className="text-gray-900 font-sans font-bold text-lg mx-1">{formData.nationalCode}</strong>
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login">
                <Button className="w-full">ورود به حساب کاربری</Button>
            </Link>
            <Link to="/">
                <Button variant="ghost" className="w-full">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-brand p-6 text-center text-white" style={{ backgroundColor: '#2563eb' }}>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">ایجاد حساب کاربری</h2>
          <p className="text-blue-100 mt-2">برای دسترسی به خدمات روانکارگاه ثبت نام کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام و نام خانوادگی (فارسی) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fullNameFa}
                onChange={e => setFormData({...formData, fullNameFa: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام و نام خانوادگی (انگلیسی) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                dir="ltr"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fullNameEn}
                onChange={e => setFormData({...formData, fullNameEn: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام پدر <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fatherName}
                onChange={e => setFormData({...formData, fatherName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محل تولد <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.birthPlace}
                onChange={e => setFormData({...formData, birthPlace: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاریخ تولد (شمسی) <span className="text-red-500">*</span>
              </label>
              <PersianDatePicker
                value={formData.birthDate}
                onChange={(date) => setFormData({...formData, birthDate: date})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                جنسیت <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value as 'male' | 'female'})}
              >
                <option value="">انتخاب کنید...</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                میزان تحصیلات <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.education}
                onChange={e => setFormData({...formData, education: e.target.value})}
              >
                <option value="">انتخاب کنید...</option>
                <option value="زیر دیپلم">زیر دیپلم</option>
                <option value="دیپلم">دیپلم</option>
                <option value="کاردانی">کاردانی</option>
                <option value="کارشناسی">کارشناسی</option>
                <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                <option value="دکتری">دکتری</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وضعیت تأهل <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.maritalStatus}
                onChange={e => setFormData({...formData, maritalStatus: e.target.value})}
              >
                <option value="">انتخاب کنید...</option>
                <option value="مجرد">مجرد</option>
                <option value="متاهل">متاهل</option>
              </select>
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                 <h3 className="text-sm font-bold text-blue-600 mb-4">اطلاعات ورود به سامانه</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                شماره همراه (نام کاربری) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                dir="ltr"
                placeholder="0912..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-sans font-bold outline-none"
                value={formData.mobile}
                onChange={e => setFormData({...formData, mobile: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                کد ملی (رمز عبور) <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                dir="ltr"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-sans font-bold outline-none"
                value={formData.nationalCode}
                onChange={e => setFormData({...formData, nationalCode: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تکرار رمز عبور <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                dir="ltr"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-sans font-bold outline-none"
                value={formData.confirmNationalCode}
                onChange={e => setFormData({...formData, confirmNationalCode: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6">
            <Button className="w-full py-3 text-lg" type="submit">ثبت نام</Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              قبلاً ثبت نام کرده‌اید؟ <Link to="/login" className="text-blue-600 font-bold hover:underline">وارد شوید</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
