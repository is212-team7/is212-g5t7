import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Skill = sequelize.define('skill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

