import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ...
});
