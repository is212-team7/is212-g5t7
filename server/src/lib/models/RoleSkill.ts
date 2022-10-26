import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const RoleSkill = sequelize.define('RoleSkill', {
    Role_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    Skill_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
});
