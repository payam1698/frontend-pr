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
    const { name, fullNameEn, age, education, maritalStatus } = req.body;
    
    await req.user.update({
      name: name || req.user.name,
      full_name_en: fullNameEn || req.user.full_name_en,
      age: age || req.user.age,
      education: education || req.user.education,
      marital_status: maritalStatus || req.user.marital_status
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
