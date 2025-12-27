
import React, { useState, useEffect } from 'react';
import { User, ArrowLeft, ArrowRight, Printer, AlertCircle, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mcmiQuestions } from '../data/mcmiData';
import { calculateScores, scaleNames, ScoreReport, UserInfo } from '../utils/mcmiScoring';
import { toPersianDigits } from '../utils';
import { useAuth } from '../context/AuthContext';

const McmiPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'info' | 'test' | 'report'>('info');
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 30;
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    code: '',
    age: 0,
    gender: 'male',
    education: '',
    maritalStatus: '',
    inpatientStatus: '1'
  });

  const [answers, setAnswers] = useState<boolean[]>(new Array(175).fill(false));
  const [report, setReport] = useState<ScoreReport | null>(null);

  // Pre-fill user info from profile (but allow editing)
  useEffect(() => {
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        name: user.name || prev.name,
        age: (user as any).age || prev.age,
        gender: (user as any).gender || prev.gender,
        education: (user as any).education || prev.education,
        maritalStatus: (user as any).marital_status || prev.maritalStatus
      }));
    }
  }, [user]);

  const totalPages = Math.ceil(mcmiQuestions.length / questionsPerPage);

  // Access Control Check
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl p-8 shadow-lg text-center border border-gray-100">
           <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={40} />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">دسترسی محدود</h2>
           <p className="text-gray-600 mb-8 leading-relaxed">
             برای انجام این آزمون، ابتدا باید وارد سامانه شوید.
           </p>
           <Link to="/login">
             <Button size="lg" className="w-full">ورود به حساب کاربری</Button>
           </Link>
        </div>
      </div>
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.age) {
        alert('لطفا نام و سن را وارد کنید.');
        return;
    }
    setStep('test');
    window.scrollTo(0, 0);
  };

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      finishTest();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const finishTest = async () => {
    try {
      // Submit to backend to save results
      const response = await fetch('/api/test/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ answers, userInfo })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setReport(data.data.report);
        console.log('✅ Test results saved successfully');
      } else {
        // Fallback to local calculation if backend fails
        const result = calculateScores(answers, userInfo);
        setReport(result);
        console.error('Backend save failed, using local calculation');
      }
    } catch (error) {
      // Fallback to local calculation
      const result = calculateScores(answers, userInfo);
      setReport(result);
      console.error('Error submitting test:', error);
    }
    
    setStep('report');
    window.scrollTo(0, 0);
  };

  const printReport = () => {
    window.print();
  };

  // --- RENDERERS ---

  const renderInfoForm = () => (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <User className="text-brand" /> مشخصات فردی
      </h2>
      <form onSubmit={handleInfoSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.name}
              onChange={e => setUserInfo({...userInfo, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">کد ملی / کد پرونده</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.code}
              onChange={e => setUserInfo({...userInfo, code: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سن *</label>
            <input
              type="number"
              required
              min="12"
              max="100"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.age || ''}
              onChange={e => setUserInfo({...userInfo, age: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">جنسیت *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={userInfo.gender === 'male'}
                  onChange={() => setUserInfo({...userInfo, gender: 'male'})}
                  className="text-brand focus:ring-brand"
                />
                <span>مرد</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={userInfo.gender === 'female'}
                  onChange={() => setUserInfo({...userInfo, gender: 'female'})}
                  className="text-brand focus:ring-brand"
                />
                <span>زن</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">میزان تحصیلات</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.education}
              onChange={e => setUserInfo({...userInfo, education: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وضعیت تأهل</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.maritalStatus}
              onChange={e => setUserInfo({...userInfo, maritalStatus: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">وضعیت بستری (طول اپیزود Axis-I)</label>
            <select
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
                value={userInfo.inpatientStatus}
                onChange={e => setUserInfo({...userInfo, inpatientStatus: e.target.value as any})}
            >
                <option value="1">سرپایی (Outpatient)</option>
                <option value="2">بستری کمتر از ۱ هفته</option>
                <option value="3">بستری ۱ تا ۴ هفته</option>
                <option value="4">بستری بیش از ۴ هفته</option>
                <option value="5">نامشخص</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button type="submit" size="lg">شروع آزمون <ArrowLeft className="mr-2" /></Button>
        </div>
      </form>
    </div>
  );

  const renderQuestions = () => {
    const startIdx = currentPage * questionsPerPage;
    const endIdx = Math.min(startIdx + questionsPerPage, mcmiQuestions.length);
    const currentQuestions = mcmiQuestions.slice(startIdx, endIdx);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-8">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><AlertCircle size={20} className="text-blue-600"/> راهنما</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                پرسشنامه‌ای که در اختیار شما قرار گرفته است دارای جمله‌هایی است که مردم برای توصیف خودشان به کار می‌برند. لطفاً با دقت هر عبارت را بخوانید و میزان موافقت یا مخالفت خود را با انتخاب گزینه‌های "بله" و "خیر" مشخص کنید.
                صداقت شما در پاسخگویی به دقت نتایج کمک می‌کند. این اطلاعات کاملاً محرمانه باقی می‌ماند.
            </p>
        </div>

        <div className="space-y-4 mb-8">
          {currentQuestions.map((q, idx) => {
            const realIndex = startIdx + idx;
            return (
              <div key={realIndex} className={`p-4 rounded-xl border ${realIndex % 2 === 0 ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-200'} flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-brand/30`}>
                <div className="flex items-start gap-3">
                  <span className="font-mono font-bold text-brand bg-brand/10 w-8 h-8 flex items-center justify-center rounded-lg shrink-0">
                    {toPersianDigits(realIndex + 1)}
                  </span>
                  <p className="text-gray-800 leading-7 pt-0.5">{q}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 px-2">
                  <label className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${answers[realIndex] ? 'bg-green-50 text-green-600 font-bold border border-green-200' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <input
                      type="radio"
                      name={`q-${realIndex}`}
                      checked={answers[realIndex]}
                      onChange={() => handleAnswerChange(realIndex, true)}
                      className="hidden"
                    />
                    <span>بله</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg transition-colors ${!answers[realIndex] ? 'bg-red-50 text-red-600 font-bold border border-red-200' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <input
                      type="radio"
                      name={`q-${realIndex}`}
                      checked={!answers[realIndex]}
                      onChange={() => handleAnswerChange(realIndex, false)}
                      className="hidden"
                    />
                    <span>خیر</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg border border-gray-100 sticky bottom-4 z-20">
          <Button 
            variant="outline" 
            onClick={handlePrevPage} 
            disabled={currentPage === 0}
            className="w-32"
          >
            <ArrowRight size={18} className="ml-2" /> قبلی
          </Button>
          <span className="font-bold text-gray-500">
            صفحه {toPersianDigits(currentPage + 1)} از {toPersianDigits(totalPages)}
          </span>
          <Button 
            onClick={handleNextPage} 
            className="w-32"
          >
            {currentPage === totalPages - 1 ? 'پایان آزمون' : 'بعدی'}
            {currentPage !== totalPages - 1 && <ArrowLeft size={18} className="mr-2" />}
          </Button>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    if (!report) return null;

    const scaleOrder = ['25', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

    const getInpLabel = (val: string) => {
        switch(val) {
            case '1': return 'Outpatient';
            case '2': return '< 1 Week';
            case '3': return '1-4 Weeks';
            case '4': return '> 4 Weeks';
            default: return 'Unknown';
        }
    };

    return (
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-none md:rounded-3xl shadow-none md:shadow-lg printable-content" dir="ltr">
        <div className="flex justify-between items-start mb-8 border-b-2 border-gray-800 pb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">MCMI-II Final Report</h1>
                <p className="text-gray-500 text-sm">Ravankargah Institute</p>
            </div>
            <div className="hidden print:hidden md:block">
                <Button variant="outline" onClick={printReport} className="flex gap-2">
                    <Printer size={18} /> Print / Save PDF
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 mb-8 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 print:bg-transparent print:border-none print:p-0">
            <div><span className="font-bold text-gray-700">Name:</span> {userInfo.name}</div>
            <div><span className="font-bold text-gray-700">Code:</span> {userInfo.code}</div>
            <div><span className="font-bold text-gray-700">Age:</span> {userInfo.age}</div>
            <div><span className="font-bold text-gray-700">Gender:</span> {userInfo.gender === 'male' ? 'Male' : 'Female'}</div>
            <div><span className="font-bold text-gray-700">Education:</span> {userInfo.education}</div>
            <div><span className="font-bold text-gray-700">Marital Status:</span> {userInfo.maritalStatus}</div>
            <div><span className="font-bold text-gray-700">Inpatient:</span> {getInpLabel(userInfo.inpatientStatus)}</div>
            <div><span className="font-bold text-gray-700">Date:</span> {new Date().toLocaleDateString('en-US')}</div>
            <div className="col-span-2"><span className="font-bold text-gray-700">X (Disclosure):</span> {report.xScore}</div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100 text-gray-800 print:bg-gray-200">
                        <th className="p-2 border border-gray-300 text-center">Code</th>
                        <th className="p-2 border border-gray-300 text-left">Scale</th>
                        <th className="p-2 border border-gray-300 text-center w-12">Raw</th>
                        <th className="p-2 border border-gray-300 text-center w-12">BR</th>
                        <th className="p-2 border border-gray-300 text-center w-12">X Cor</th>
                        <th className="p-2 border border-gray-300 text-center w-12">1/2X</th>
                        <th className="p-2 border border-gray-300 text-center w-12">DA</th>
                        <th className="p-2 border border-gray-300 text-center w-12">DD</th>
                        <th className="p-2 border border-gray-300 text-center w-12">DC</th>
                        <th className="p-2 border border-gray-300 text-center w-12">Inp</th>
                        <th className="p-2 border border-gray-300 text-center w-12 bg-gray-200 font-bold">Final</th>
                    </tr>
                </thead>
                <tbody>
                    {scaleOrder.map(scaleId => {
                        const s = report.adjustedScores[scaleId];
                        if (!s) return null;
                        const info = scaleNames[scaleId];
                        const isSignificant = s.final >= 75;
                        const isHigh = s.final >= 85;

                        return (
                            <tr key={scaleId} className={`${isHigh ? 'bg-red-50' : isSignificant ? 'bg-orange-50' : ''} hover:bg-gray-50`}>
                                <td className="p-2 border border-gray-300 text-center font-mono">{info.code}</td>
                                <td className="p-2 border border-gray-300">{info.name}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-500">{s.raw}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-500">{s.br}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.xCor}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.hxCor}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.daAdj || '-'}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.ddAdj || '-'}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.dcAdj || '-'}</td>
                                <td className="p-2 border border-gray-300 text-center text-gray-400 text-xs">{s.inpAdj || '-'}</td>
                                <td className={`p-2 border border-gray-300 text-center font-bold ${isHigh ? 'text-red-700' : isSignificant ? 'text-orange-600' : 'text-gray-700'}`}>
                                    {s.final}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        
        <div className="mt-8 text-xs text-gray-500 border-t pt-4">
             <p>* BR scores of 75-84 indicate the presence of a trait/disorder.</p>
             <p>* BR scores of 85+ indicate the prominence of a trait/disorder.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {step !== 'report' && (
             <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">آزمون بالینی میلون (MCMI-II)</h1>
                <p className="text-gray-500">پرسشنامه چندمحوری بالینی میلون نسخه ۲</p>
             </div>
        )}

        {/* Steps for Desktop */}
        {step !== 'report' && (
            <div className="hidden md:flex justify-between items-center max-w-2xl mx-auto mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                {[
                    { id: 'info', label: 'مشخصات' },
                    { id: 'test', label: 'سوالات' },
                    { id: 'report', label: 'نتیجه' }
                ].map((s, i) => {
                    const isActive = s.id === step;
                    const isPassed = ['info', 'test', 'report'].indexOf(step) > i;
                    
                    return (
                        <div key={s.id} className="flex flex-col items-center bg-gray-50 px-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${isActive ? 'bg-brand text-white border-brand' : isPassed ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-400 border-gray-200'}`}>
                                {isPassed ? <CheckCircle2 size={20} /> : i + 1}
                            </div>
                            <span className={`text-sm mt-2 font-medium ${isActive ? 'text-brand' : isPassed ? 'text-green-600' : 'text-gray-400'}`}>{s.label}</span>
                        </div>
                    );
                })}
            </div>
        )}

        {step === 'info' && renderInfoForm()}
        {step === 'test' && renderQuestions()}
        {step === 'report' && renderReport()}

      </div>
    </div>
  );
};

export default McmiPage;
