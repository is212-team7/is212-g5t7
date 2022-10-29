import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';
import { Course } from './Course';
import { LearningJourney } from './LearningJourney';

export class PathwayModel extends Model<
    InferAttributes<PathwayModel>,
    InferCreationAttributes<PathwayModel>
> {
    declare LJ_ID: number;
    declare Course_ID: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const Pathway = PathwayModel.init(
    {
        LJ_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: LearningJourney,
                key: 'LJ_ID',
            },
        },
        Course_ID: {
            type: DataTypes.STRING,
            references: {
                model: Course,
                key: 'Course_ID',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'Pathway',
        sequelize,
    }
);

LearningJourney.belongsToMany(Course, {
    through: Pathway,
    as: 'Course',
    foreignKey: 'LJ_ID',
});

Course.belongsToMany(LearningJourney, {
    through: Pathway,
    as: 'LearningJourney',
    foreignKey: 'Course_ID',
});
