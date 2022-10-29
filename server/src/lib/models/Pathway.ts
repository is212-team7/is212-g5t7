import {
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManyRemoveAssociationMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';
import { Course, CourseModel } from './Course';
import { LearningJourney } from './LearningJourney';

export class PathwayModel extends Model<
    InferAttributes<PathwayModel>,
    InferCreationAttributes<PathwayModel>
> {
    declare Pathway_ID: CreationOptional<number>;
    declare LJ_ID: number;
    declare Course_ID: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // methods
    declare getCourse: HasManyGetAssociationsMixin<CourseModel>;
    declare countCourse: HasManyCountAssociationsMixin;
    declare hasCourse: HasManyHasAssociationMixin<CourseModel, string>;
    declare setCourse: HasManySetAssociationsMixin<CourseModel, string>;
    declare addCourse: HasManyAddAssociationMixin<CourseModel, string>;
    declare removeCourse: HasManyRemoveAssociationMixin<CourseModel, string>;
    declare createCourse: HasManyCreateAssociationMixin<
        CourseModel,
        'Course_ID'
    >;
}

export const Pathway = PathwayModel.init(
    {
        Pathway_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
