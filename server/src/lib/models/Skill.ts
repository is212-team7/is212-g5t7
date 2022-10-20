import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Skill = sequelize.define('skill', {
  Skill_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Skill_Name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Skill_Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Skill_Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Skill_Deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});
