import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Users, Brain, Loader2 
} from 'lucide-react';
import { useCourses } from '../context/CourseContext';
import Button from '../components/Button';
import CourseCard from '../components/CourseCard';
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

const InstructorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCourses();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  
  const instructorCourses = courses.filter(c => c.instructorId === id);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`/api/instructors/${id}`);
        if (response.data.success) {
          setInstructor(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching instructor:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructor();
  }, [id]);

  const getImageUrl = (inst: Instructor) => {
    if (inst.image) return inst.image;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(inst.name)}&background=002147&color=fff&size=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">استاد مورد نظر یافت نشد</h2>
          <Link to="/instructors">
            <Button>بازگشت به لیست اساتید</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Breadcrumbs = () => (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
          <Link to="/" className="hover:text-brand transition-colors">خانه</Link>
          <span className="text-gray-300">/</span>
          <Link to="/instructors" className="hover:text-brand transition-colors">اساتید</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{instructor.name}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-right">
                <div className="shrink-0">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-2 border-4 border-brand/10 shadow-lg relative">
                        <img 
                            src={getImageUrl(instructor)} 
                            alt={instructor.name} 
                            className="w-full h-full rounded-full object-cover" 
                        />
                        <div className="absolute bottom-2 left-2 bg-white rounded-full p-2 shadow-md text-brand">
                            <GraduationCap size={24} />
                        </div>
                    </div>
                </div>
                <div className="flex-grow space-y-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{instructor.name}</h1>
                        <p className="text-brand text-lg font-medium">{instructor.title}</p>
                    </div>
                </div>
            </div>

            {instructor.experience && (
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-accent rounded-full block"></span>
                        <Brain className="text-gray-600" size={24} />
                        سوابق علمی و اجرایی
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {instructor.experience}
                    </p>
                </section>
            )}

            {instructor.courses_description && (
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-brand rounded-full block"></span>
                        <BookOpen className="text-gray-600" size={24} />
                        دوره‌ها و کارگاه‌های آموزشی
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {instructor.courses_description}
                    </p>
                </section>
            )}

          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-brand-dark text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">دوره‌های فعال استاد</h3>
                    <p className="text-brand-light text-sm">
                        لیست دوره‌هایی که هم‌اکنون توسط {instructor.name} در روانکارگاه تدریس می‌شود.
                    </p>
                 </div>
                 <div className="absolute -right-6 -bottom-6 text-white/10">
                     <Users size={120} />
                 </div>
             </div>

             <div className="grid gap-4">
                 {instructorCourses.length > 0 ? (
                     instructorCourses.map(course => (
                         <CourseCard key={course.id} course={course} />
                     ))
                 ) : (
                     <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 text-gray-500">
                         در حال حاضر دوره‌ی فعالی موجود نیست.
                     </div>
                 )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstructorDetailsPage;
