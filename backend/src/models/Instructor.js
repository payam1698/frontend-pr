import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Instructor = sequelize.define('Instructor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  specialty: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'instructors',
  timestamps: true,
  underscored: true
});

export default Instructor;
