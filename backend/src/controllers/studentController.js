import { Certificate, Course, Enrollment, MillonResult } from '../models/index.js';

export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, full_name_en, gender, education, marital_status, father_name, birth_place, birth_date } = req.body;
    
    await req.user.update({
      name: name || req.user.name,
      full_name_en: full_name_en || req.user.full_name_en,
      gender: gender || req.user.gender,
      education: education || req.user.education,
      marital_status: marital_status || req.user.marital_status,
      father_name: father_name || req.user.father_name,
      birth_place: birth_place || req.user.birth_place,
      birth_date: birth_date || req.user.birth_date
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: req.user.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

export const getTestHistory = async (req, res) => {
  try {
    const results = await MillonResult.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test history',
      error: error.message
    });
  }
};

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Course, as: 'course' }],
      order: [['issue_date', 'DESC']]
    });

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
      error: error.message
    });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Course, as: 'course' }],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
      error: error.message
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    console.log(`[MESSAGE] New message from user ${req.user.name} (${req.user.phone}): ${message}`);

    res.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID is required'
      });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      where: { user_id: req.user.id, course_id: courseId }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create({
      user_id: req.user.id,
      course_id: courseId,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Enrollment request submitted',
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to enroll in course',
      error: error.message
    });
  }
};
