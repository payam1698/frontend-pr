import { Router } from 'express';
import { submitTest, getTestHistory, getTestResult } from '../controllers/testController.js';
import { authenticateToken } from '../middleware/jwtAuth.js';

const router = Router();

router.post('/submit', authenticateToken, submitTest);
router.get('/history', authenticateToken, getTestHistory);
router.get('/:id', authenticateToken, getTestResult);

export default router;
