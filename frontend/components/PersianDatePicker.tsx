import React, { useState, useEffect } from 'react';

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({ value, onChange, className = '' }) => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

  useEffect(() => {
    if (value) {
      const parts = value.split('/');
      if (parts.length === 3) {
        setYear(parts[0]);
        setMonth(parts[1]);
        setDay(parts[2]);
      }
    }
  }, []);

  useEffect(() => {
    if (year && month && day) {
      const formattedDate = `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
      onChange(formattedDate);
    }
  }, [year, month, day]);

  const currentYear = 1403;
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);

  const getDaysInMonth = () => {
    const m = parseInt(month);
    if (!m || m <= 6) return 31;
    if (m <= 11) return 30;
    return 29;
  };

  const days = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  return (
    <div className={`flex gap-2 ${className}`} dir="rtl">
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
      >
        <option value="">روز</option>
        {days.map(d => (
          <option key={d} value={String(d)}>{d}</option>
        ))}
      </select>
      
      <select
        value={month}
        onChange={(e) => { setMonth(e.target.value); setDay(''); }}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
      >
        <option value="">ماه</option>
        {persianMonths.map((name, i) => (
          <option key={i + 1} value={String(i + 1)}>{name}</option>
        ))}
      </select>
      
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
      >
        <option value="">سال</option>
        {years.map(y => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default PersianDatePicker;
