import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const LearningJourney = sequelize.define('LearningJourney', {
    Staff_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    Role_ID: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
    },
    Course_ID: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
    },
});
