import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const Role_Skill = sequelize.define('Role_Skill', {
    Role_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    Skill_ID: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
});
