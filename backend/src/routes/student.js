import { Router } from 'express';
import { 
  getProfile, 
  updateProfile,
  getTestHistory, 
  getMyCertificates,
  getMyEnrollments,
  enrollInCourse,
  sendMessage
} from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/jwtAuth.js';

const router = Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/test-history', getTestHistory);
router.get('/my-certificates', getMyCertificates);
router.get('/my-enrollments', getMyEnrollments);
router.post('/enroll', enrollInCourse);
router.post('/message', sendMessage);

export default router;
