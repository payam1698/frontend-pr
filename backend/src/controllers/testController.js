import { MillonResult } from '../models/index.js';
import { calculateMcmiScores } from '../services/mcmiScoring.js';

export const submitTest = async (req, res) => {
  try {
    const { answers, userInfo } = req.body;
    const userId = req.user.id;

    if (!answers || !Array.isArray(answers) || answers.length < 175) {
      return res.status(400).json({
        success: false,
        message: 'Invalid answers: must be array with at least 175 responses'
      });
    }

    if (!userInfo || !userInfo.gender) {
      return res.status(400).json({
        success: false,
        message: 'User info with gender is required'
      });
    }

    const answersMap = {};
    answers.forEach((ans, idx) => {
      answersMap[idx + 1] = ans;
    });

    const inpatientStatus = userInfo.inpatientStatus || 1;
    const report = calculateMcmiScores(answersMap, userInfo.gender, inpatientStatus);

    const nameParts = (userInfo.name || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const millonResult = await MillonResult.create({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      gender: userInfo.gender,
      age: userInfo.age || null,
      marital_status: userInfo.maritalStatus || null,
      education_level: userInfo.education || null,
      phone: req.user.phone,
      inpatient_status: userInfo.inpatientStatus || null,
      raw_responses: answers,
      calculated_scales: report,
      full_report: JSON.stringify(report)
    });

    res.status(201).json({
      success: true,
      message: 'Test submitted successfully',
      data: {
        resultId: millonResult.id,
        report
      }
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit test',
      error: error.message
    });
  }
};

export const getTestHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await MillonResult.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Get test history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test history',
      error: error.message
    });
  }
};

export const getTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await MillonResult.findOne({
      where: { id, user_id: userId }
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Test result not found'
      });
    }

    res.json({
      success: true,
      data: {
        result
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test result',
      error: error.message
    });
  }
};
