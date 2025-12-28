import { User } from '../models/index.js';
import { generateToken } from '../middleware/jwtAuth.js';

export const register = async (req, res) => {
  try {
    const { name, phone, password, fullNameEn, gender, education, maritalStatus, fatherName, birthPlace, birthDate } = req.body;

    if (!name || !phone || !password || !gender || !education || !maritalStatus || !fatherName || !birthPlace || !birthDate) {
      return res.status(400).json({
        success: false,
        message: 'تمام فیلدها الزامی هستند'
      });
    }

    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }

    const user = await User.create({
      name,
      phone,
      password,
      full_name_en: fullNameEn || null,
      gender: gender || null,
      education: education || null,
      marital_status: maritalStatus || null,
      father_name: fatherName || null,
      birth_place: birthPlace || null,
      birth_date: birthDate || null,
      role: 'student'
    });

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log('[LOGIN] Attempt for phone:', phone);

    if (!phone || !password) {
      console.log('[LOGIN] Missing phone or password');
      return res.status(400).json({
        success: false,
        message: 'Phone and password are required'
      });
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      console.log('[LOGIN] User not found for phone:', phone);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('[LOGIN] User found:', user.name, '- checking password...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('[LOGIN] Password mismatch for user:', user.name);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user.id);
    console.log('[LOGIN] Success for user:', user.name);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    console.error('[LOGIN] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

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
