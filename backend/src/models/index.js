import { sequelize } from '../config/db.js';
import User from './User.js';
import Course from './Course.js';
import MillonResult from './MillonResult.js';
import Enrollment from './Enrollment.js';
import Certificate from './Certificate.js';
import Instructor from './Instructor.js';

User.hasMany(MillonResult, { foreignKey: 'user_id', as: 'millonResults' });
MillonResult.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Enrollment, { foreignKey: 'user_id', as: 'enrollments' });
Enrollment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Course.hasMany(Enrollment, { foreignKey: 'course_id', as: 'enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

User.hasMany(Certificate, { foreignKey: 'user_id', as: 'certificates' });
Certificate.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Course.hasMany(Certificate, { foreignKey: 'course_id', as: 'certificates' });
Certificate.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

export const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database synchronized successfully.');
    return true;
  } catch (error) {
    console.error('Error synchronizing database:', error);
    return false;
  }
};

export { User, Course, MillonResult, Enrollment, Certificate, Instructor };
