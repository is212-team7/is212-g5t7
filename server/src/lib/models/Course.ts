import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Course = sequelize.define('course', {
  Course_ID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Course_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Course_Desc: {
    type: DataTypes.STRING,
  },
  Course_Status: {
    type: DataTypes.STRING,
  },
  Course_Type: {
    type: DataTypes.STRING,
  },
  Course_Category: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: false
}
);
