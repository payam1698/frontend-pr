
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '../types';
import { courses as initialCourses } from '../data/mockData';

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updatedData: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load from local storage or fall back to mock data
    const storedCourses = localStorage.getItem('appCourses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      setCourses(initialCourses);
      localStorage.setItem('appCourses', JSON.stringify(initialCourses));
    }
  }, []);

  const saveCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem('appCourses', JSON.stringify(newCourses));
  };

  const addCourse = (course: Course) => {
    const newCourses = [...courses, course];
    saveCourses(newCourses);
  };

  const updateCourse = (id: string, updatedData: Partial<Course>) => {
    const newCourses = courses.map(c => c.id === id ? { ...c, ...updatedData } : c);
    saveCourses(newCourses);
  };

  const deleteCourse = (id: string) => {
    const newCourses = courses.filter(c => c.id !== id);
    saveCourses(newCourses);
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
