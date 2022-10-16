import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Role = sequelize.define('role', {
  Role_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Role_Name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Role_Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
