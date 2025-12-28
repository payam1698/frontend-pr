import { Router } from 'express';
import { Instructor } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      where: { status: 'active' },
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
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Instructor not found'
      });
    }

    res.json({
      success: true,
      data: instructor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructor',
      error: error.message
    });
  }
});

export default router;
