import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';
import { Course } from './Course';
import { Staff } from './Staff';

export class RegistrationModel extends Model<
    InferAttributes<RegistrationModel>,
    InferCreationAttributes<RegistrationModel>
> {
    declare Reg_ID: number;
    declare Course_ID?: string;
    declare Staff_ID?: number;
    declare Reg_Status?: string;
    declare Completion_Status?: string;
}

export const Registration = RegistrationModel.init(
    {
        Reg_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Course_ID: {
            type: DataTypes.STRING,
            references: {
                model: Course,
                key: 'Course_ID',
            },
        },
        Staff_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Staff,
                key: 'Staff_ID',
            },
        },
        Reg_Status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Completion_Status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize, tableName: 'registration', timestamps: false }
);

// Associations
Course.belongsToMany(Staff, {
    through: Registration,
    as: 'Staff',
    foreignKey: 'Course_ID',
});

Staff.belongsToMany(Course, {
    through: Registration,
    as: 'Course',
    foreignKey: 'Staff_ID',
});
