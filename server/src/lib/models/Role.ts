import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Role = sequelize.define('role', {
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
