import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById,
  getAllCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  uploadCertificate,
  upload,
  getAllTestResults
} from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/jwtAuth.js';
import { requireAdmin } from '../middleware/roleGuard.js';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

router.get('/courses', getAllCourses);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

router.post('/upload-certificate', upload.single('certificate'), uploadCertificate);

router.get('/test-results', getAllTestResults);

export default router;
