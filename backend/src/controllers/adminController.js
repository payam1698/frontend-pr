import { User, Course, Certificate, MillonResult, Enrollment, Instructor } from '../models/index.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '../uploads');
const instructorImagesDir = path.join(__dirname, '../uploads/instructors');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(instructorImagesDir)) fs.mkdirSync(instructorImagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'certificate-' + uniqueSuffix + '.pdf');
  }
});

const instructorImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, instructorImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'instructor-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const uploadInstructorImage = multer({
  storage: instructorImageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: MillonResult, as: 'millonResults' },
        { model: Enrollment, as: 'enrollments', include: [{ model: Course, as: 'course' }] },
        { model: Certificate, as: 'certificates' }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, teacherName, status, image, category, durationHours, sessions, isOnline, hasCertificate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Course title is required'
      });
    }

    const course = await Course.create({
      title,
      description,
      price: price || 0,
      teacher_name: teacherName,
      status: status || 'active',
      image,
      category,
      duration_hours: durationHours,
      sessions,
      is_online: isOnline !== undefined ? isOnline : true,
      has_certificate: hasCertificate || false
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
      error: error.message
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await course.update(updateData);

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
      error: error.message
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await course.destroy();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: error.message
    });
  }
};

export const uploadCertificate = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required'
      });
    }

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and Course ID are required'
      });
    }

    const certificate = await Certificate.create({
      user_id: userId,
      course_id: courseId,
      pdf_path: req.file.path,
      issue_date: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Certificate uploaded successfully',
      data: certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload certificate',
      error: error.message
    });
  }
};

export const getAllTestResults = async (req, res) => {
  try {
    const results = await MillonResult.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'phone'] }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test results',
      error: error.message
    });
  }
};

export const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: instructors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructors',
      error: error.message
    });
  }
};

export const createInstructor = async (req, res) => {
  try {
    const { name, name_en, title, specialty, bio, email, phone, status } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Instructor name is required'
      });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = '/api/uploads/instructors/' + req.file.filename;
    }

    const instructor = await Instructor.create({
      name,
      name_en,
      title,
      specialty,
      bio,
      email,
      phone,
      status: status || 'active',
      image: imagePath
    });

    res.status(201).json({
      success: true,
      message: 'Instructor created successfully',
      data: instructor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create instructor',
      error: error.message
    });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_en, title, specialty, bio, email, phone, status } = req.body;

    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    const updateData = { name, name_en, title, specialty, bio, email, phone, status };
    
    if (req.file) {
      updateData.image = '/api/uploads/instructors/' + req.file.filename;
    }

    await instructor.update(updateData);

    res.json({
      success: true,
      message: 'Instructor updated successfully',
      data: instructor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update instructor',
      error: error.message
    });
  }
};

export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByPk(id);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    await instructor.destroy();

    res.json({
      success: true,
      message: 'Instructor deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete instructor',
      error: error.message
    });
  }
};
