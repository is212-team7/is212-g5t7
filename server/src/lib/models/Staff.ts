import {
    Association,
    BelongsToManyAddAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManySetAssociationsMixin,
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
    NonAttribute,
} from 'sequelize';
import { sequelize } from '../../database';
import { CourseModel } from './Course';
import { LearningJourneyModel } from './LearningJourney';
import { RoleModel } from './Role';

export class StaffModel extends Model<
    InferAttributes<StaffModel>,
    InferCreationAttributes<StaffModel>
> {
    declare Staff_ID: number;
    declare Staff_FName?: string;
    declare Staff_LName?: string;
    declare Dept?: string;
    declare Email?: string;
    declare System_Role_ID: number;

    // associations
    declare roles?: NonAttribute<RoleModel[]>;
    declare courses?: NonAttribute<CourseModel[]>;

    declare static associations: {
        roles: Association<StaffModel, RoleModel>;
        courses: Association<StaffModel, CourseModel>;
    };

    // methods
    declare addLearningJourney: HasManyAddAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare countLearningJourney: HasManyCountAssociationsMixin;
    declare hasLearningJourney: HasManyHasAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare setLearningJourney: HasManySetAssociationsMixin<
        LearningJourneyModel,
        number
    >;
    declare getLearningJourney: HasManyGetAssociationsMixin<LearningJourneyModel>;
    declare removeLearningJourney: HasManyRemoveAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare createLearningJourney: HasManyCreateAssociationMixin<LearningJourneyModel>;

    declare addCourse: BelongsToManyAddAssociationMixin<CourseModel, number>;
    declare countCourse: BelongsToManyCountAssociationsMixin;
    declare hasCourse: BelongsToManyHasAssociationMixin<CourseModel, number>;
    declare setCourse: BelongsToManySetAssociationsMixin<CourseModel, number>;
    declare getCourse: BelongsToManyGetAssociationsMixin<CourseModel>;
    declare removeCourse: BelongsToManyRemoveAssociationMixin<
        CourseModel,
        number
    >;
    declare createCourse: BelongsToManyCreateAssociationMixin<CourseModel>;
}

export const Staff = StaffModel.init(
    {
        Staff_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Staff_FName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Staff_LName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Dept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        System_Role_ID: {
            type: DataTypes.INTEGER,
        },
    },
    { sequelize, tableName: 'staff', timestamps: false }
);
