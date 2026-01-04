/*
  # Seed Sample Data for Ravankargah Platform

  1. Insert Categories
  2. Insert Instructors
  3. Insert Courses
  4. Insert Admin User
*/

-- Insert Categories
INSERT INTO categories (title, icon_name) VALUES
  ('تخصصی روان‌درمانی', 'Brain'),
  ('روانشناسی کودک و نوجوان', 'Baby'),
  ('مشاوره و کوچینگ', 'Users'),
  ('سکس‌تراپی و اعتیاد', 'HeartPulse'),
  ('مشاوره تحصیلی و شغلی', 'GraduationCap'),
  ('تخصصی پیشرفته', 'Sparkles')
ON CONFLICT (title) DO NOTHING;

-- Insert Instructors
INSERT INTO instructors (name, title, description, image, specialties, academic_background, full_bio, workshops) VALUES
(
  'دکتر یعقوب شفیعی‌فرد',
  'روان‌شناس و مدرس ممتاز کشوری',
  'مدرس دانشگاه تهران و از بنیان‌گذاران آموزش تخصصی طرحواره‌درمانی و CBT در ایران با ۱۵ سال سابقه درخشان.',
  'https://ui-avatars.com/api/?name=Yaqub+Shafieifard&background=0ea5e9&color=fff&size=200',
  '["CBT", "طرحواره‌درمانی", "زوج‌درمانی", "مشاوره خانواده"]'::jsonb,
  '["دکترای روانشناسی سلامت (دانشگاه تهران)", "رتبه ۲ کنکور دکتری دانشگاه تهران", "مدرس ممتاز کشوری"]'::jsonb,
  'دکتر یعقوب شفیعی‌فرد یکی از برجسته‌ترین روانشناسان ایران است.',
  '["طرحواره‌درمانی", "تربیت درمانگر CBT", "مصاحبه بالینی", "زوج‌درمانی و مداخله در خیانت"]'::jsonb
),
(
  'دکتر مهدی عبدلی',
  'متخصص اعصاب و روان (روانپزشک) و سکس‌تراپیست',
  'تنها دارنده گواهی معتبر FECSM اروپا در ایران و متخصص درمان اختلالات جنسی و روانپزشکی.',
  'https://ui-avatars.com/api/?name=Mehdi+Abdoli&background=f59e0b&color=fff&size=200',
  '["سکس‌تراپی", "روان‌درمانی", "DSM-5-TR", "درمان دارویی"]'::jsonb,
  '["فلوشیپ پزشکی جنسی اروپا (FECSM)", "مدیر سابق گروه روانپزشکی", "معاون آموزشی سابق"]'::jsonb,
  'دکتر مهدی عبدلی یکی از متخصصان برجسته در حوزه پزشکی جنسی است.',
  '["تربیت سکس‌تراپیست", "آسیب‌شناسی روانی", "درمان اختلالات جنسی", "تکنیک‌های زوج‌درمانی"]'::jsonb
),
(
  'دکتر محمدحسن نادری',
  'دکترای تخصصی روانشناسی و درمانگر کودک',
  'مدرس و درمانگر متخصص کودک و نوجوان، مولف کتب تخصصی.',
  'https://ui-avatars.com/api/?name=Mohammad+Naderi&background=10b981&color=fff&size=200',
  '["روانشناسی کودک", "اختلالات یادگیری", "مهارت‌های زندگی", "فرزندپروری"]'::jsonb,
  '["دکترای روانشناسی", "مولف کتب تخصصی", "پژوهشگر برتر حوزه یادگیری"]'::jsonb,
  'دکتر محمدحسن نادری، دکترای روانشناسی، متخصص برجسته است.',
  '["تربیت مربی مهارت‌های زندگی", "درمان اختلالات یادگیری", "اصلاح رفتار"]'::jsonb
),
(
  'دکتر روح‌الله حدادی',
  'متخصص روان‌شناسی بالینی و درمانگر اعتیاد',
  'مدرس دانشگاه تهران، پژوهشگر ملی و سوپروایزر تخصصی.',
  'https://ui-avatars.com/api/?name=Rohallah+Hadadi&background=6366f1&color=fff&size=200',
  '["درمان اعتیاد (MMT)", "روانشناسی بالینی", "ماتریکس تراپی", "اختلالات همبود"]'::jsonb,
  '["مدرس دانشگاه تهران", "پژوهشگر طرح‌های ملی", "مؤسس مرکز ترک اعتیاد"]'::jsonb,
  'دکتر روح‌الله حدادی، متخصص روانشناسی بالینی است.',
  '["درمان اعتیاد MMT", "ماتریکس (Matrix)", "مصاحبه انگیزشی", "درمان اختلالات همبود"]'::jsonb
),
(
  'دکتر آزادالله کرمی',
  'دکتری تکنولوژی آموزشی و مشاور تحصیلی',
  'عضو هیئت علمی دانشگاه فرهنگیان و مدرس ممتاز کشوری.',
  'https://ui-avatars.com/api/?name=Azadollah+Karami&background=ec4899&color=fff&size=200',
  '["مشاوره تحصیلی", "هدایت تحصیلی", "برنامه‌ریزی درسی", "تکنولوژی آموزشی"]'::jsonb,
  '["دکتری تکنولوژی آموزشی", "عضو هیئت علمی دانشگاه فرهنگیان", "مدرس ممتاز کشوری"]'::jsonb,
  'دکتر آزادالله کرمی، متخصص روانشناسی سلامت است.',
  '["تربیت مشاور تحصیلی", "فنون مطالعه و یادگیری", "انتخاب رشته تخصصی"]'::jsonb
),
(
  'دکتر فربد مفیدی',
  'متخصص روانشناسی سلامت و اختلالات رشدی',
  'مؤسس کلینیک‌های توانبخشی و پیشگام در درمان اختلالات.',
  'https://ui-avatars.com/api/?name=Farbod+Mofidi&background=8b5cf6&color=fff&size=200',
  '["اختلالات یادگیری", "اتیسم (ASD)", "گفتاردرمانی", "اصلاح رفتار"]'::jsonb,
  '["مؤسس مرکز اختلالات نافذ رشد", "مؤسس مؤسسه روان‌پژوهان مفید", "پیشگام خدمات گفتاردرمانی"]'::jsonb,
  'دکتر فربد مفیدی، دکترای گفتاردرمانی است.',
  '["درمان اتیسم", "روش‌های اصلاح رفتار", "کارگاه تخصصی لکنت"]'::jsonb
)
ON CONFLICT DO NOTHING;

-- Get instructor IDs for courses
DO $$ DECLARE
  instructor_1_id uuid;
  instructor_3_id uuid;
  instructor_2_id uuid;
  instructor_4_id uuid;
  instructor_5_id uuid;
  instructor_6_id uuid;
  cat_1_id uuid;
  cat_2_id uuid;
  cat_3_id uuid;
  cat_4_id uuid;
  cat_5_id uuid;
BEGIN
  -- Get IDs
  SELECT id INTO instructor_1_id FROM instructors WHERE name = 'دکتر یعقوب شفیعی‌فرد';
  SELECT id INTO instructor_3_id FROM instructors WHERE name = 'دکتر محمدحسن نادری';
  SELECT id INTO instructor_2_id FROM instructors WHERE name = 'دکتر مهدی عبدلی';
  SELECT id INTO instructor_4_id FROM instructors WHERE name = 'دکتر روح‌الله حدادی';
  SELECT id INTO instructor_5_id FROM instructors WHERE name = 'دکتر آزادالله کرمی';
  SELECT id INTO instructor_6_id FROM instructors WHERE name = 'دکتر فربد مفیدی';
  
  SELECT id INTO cat_1_id FROM categories WHERE title = 'تخصصی روان‌درمانی';
  SELECT id INTO cat_2_id FROM categories WHERE title = 'روانشناسی کودک و نوجوان';
  SELECT id INTO cat_3_id FROM categories WHERE title = 'مشاوره و کوچینگ';
  SELECT id INTO cat_4_id FROM categories WHERE title = 'سکس‌تراپی و اعتیاد';
  SELECT id INTO cat_5_id FROM categories WHERE title = 'مشاوره تحصیلی و شغلی';

  -- Insert courses
  IF instructor_1_id IS NOT NULL AND cat_1_id IS NOT NULL THEN
    INSERT INTO courses (title, instructor_id, category_id, description, image, price, duration_hours, sessions, mode, is_online, has_certificate, certificate_provider, installments_available, installments_count, rating, syllabus, schedule, objectives) VALUES
    (
      'تربیت درمانگر و مشاور خانواده (CBT)',
      instructor_1_id,
      cat_1_id,
      'دوره جامع تربیت درمانگر و مشاور خانواده با رویکرد شناختی رفتاری (CBT).',
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800',
      8975000,
      104,
      26,
      'آنلاین',
      true,
      true,
      'دانشگاه خوارزمی',
      true,
      5,
      4.9,
      '["فنون مصاحبه بالینی", "اجرا و تفسیر آزمون میلون", "تکنیک های درمان اضطراب", "تکنیک های درمان افسردگی", "تکنیک های درمان OCD", "اصول و فنون زوج‌درمانی", "مشاوره پیش از ازدواج"]'::jsonb,
      '["گروه ۱: چهارشنبه‌ها | ۹ الی ۱۳", "گروه ۲: پنجشنبه و جمعه‌ها (یک هفته در میان) | ۱۵ الی ۱۹"]'::jsonb,
      '["دوره جامع تربیت درمانگر و مشاور خانواده با رویکرد شناختی رفتاری (CBT)"]'::jsonb
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
