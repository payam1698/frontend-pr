import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const MillonResult = sequelize.define('MillonResult', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  marital_status: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  education_level: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  inpatient_status: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  raw_responses: {
    type: DataTypes.JSON,
    allowNull: false
  },
  calculated_scales: {
    type: DataTypes.JSON,
    allowNull: true
  },
  full_report: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  }
}, {
  tableName: 'millon_results'
});

export default MillonResult;
