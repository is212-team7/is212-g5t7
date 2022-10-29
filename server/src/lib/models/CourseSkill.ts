import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';
import { Course } from './Course';
import { Skill } from './Skill';

export class CourseSkillModel extends Model<
    InferAttributes<CourseSkillModel>,
    InferCreationAttributes<CourseSkillModel>
> {
    declare Course_ID: number;
    declare Skill_ID: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const CourseSkill = CourseSkillModel.init(
    {
        Course_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Course,
                key: 'Course_ID',
            },
        },
        Skill_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Skill,
                key: 'Skill_ID',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'CourseSkill',
        sequelize,
    }
);

// Associations
Course.belongsToMany(Skill, {
    through: CourseSkill,
    as: 'Skill',
    foreignKey: 'Course_ID',
});

Skill.belongsToMany(Course, {
    through: CourseSkill,
    as: 'Course',
    foreignKey: 'Skill_ID',
});
