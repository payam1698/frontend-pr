import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Phone, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Instructor {
  id: number;
  name: string;
  title: string;
  experience: string;
  courses_description: string;
  image: string | null;
  status: string;
}

const InstructorsPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('/api/instructors');
        if (response.data.success) {
          setInstructors(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const getImageUrl = (instructor: Instructor) => {
    if (instructor.image) return instructor.image;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=002147&color=fff&size=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand mb-6 transition-colors text-sm">
              <ArrowLeft size={16} className="ml-1" />
              بازگشت به صفحه اصلی
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">اساتید روان کارگاه</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              اساتید مجرب و متخصص روان کارگاه با سال‌ها تجربه علمی و عملی در زمینه روانشناسی و روان‌درمانی
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {instructors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">در حال حاضر استادی ثبت نشده است.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {instructors.map((inst) => (
              <div key={inst.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  
                  <div className="shrink-0 mx-auto md:mx-0">
                    <div className="w-40 h-40 rounded-full p-2 border-2 border-brand/20">
                      <img 
                        src={getImageUrl(inst)} 
                        alt={inst.name} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    </div>
                  </div>

                  <div className="flex-grow text-center md:text-right w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{inst.name}</h2>
                        <p className="text-brand font-medium">{inst.title}</p>
                      </div>
                      <Link to={`/instructors/${inst.id}`} className="hidden md:flex">
                          <Button variant="outline" size="sm">مشاهده پروفایل کامل</Button>
                      </Link>
                    </div>

                    {inst.experience && (
                      <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2 justify-center md:justify-start">
                          <span className="w-2 h-2 rounded-full bg-[#002147]"></span>
                          سوابق علمی:
                        </h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line line-clamp-3">
                          {inst.experience}
                        </p>
                      </div>
                    )}

                    {inst.courses_description && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2 justify-center md:justify-start">
                          <span className="w-2 h-2 rounded-full bg-[#F4C700]"></span>
                          دوره‌های تدریس:
                        </h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line line-clamp-3">
                          {inst.courses_description}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-8 md:hidden">
                      <Link to={`/instructors/${inst.id}`}>
                          <Button variant="outline" className="w-full">مشاهده پروفایل کامل</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 bg-[#002147] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F4C700]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">علاقه‌مند به همکاری با روان کارگاه هستید؟</h2>
            <p className="text-brand-light mb-8 max-w-2xl mx-auto">
              اگر متخصص روانشناسی یا روان‌درمانی هستید و تمایل به تدریس در روان کارگاه دارید، با ما تماس بگیرید.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a href="https://wa.me/989354684499" className="inline-block">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-[#F4C700] text-[#002147] hover:bg-[#CFA900]">
                  <Phone size={20} />
                  تماس از طریق واتساپ
                </Button>
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
