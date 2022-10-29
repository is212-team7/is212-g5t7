import {
    Association,
    BelongsToManyAddAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManySetAssociationsMixin,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { sequelize } from '../../database';
import { LearningJourneyModel } from './LearningJourney';
import { SkillModel } from './Skill';

export class CourseModel extends Model<
    InferAttributes<CourseModel>,
    InferCreationAttributes<CourseModel>
> {
    declare Course_ID: CreationOptional<string>;
    declare Course_Name: string;
    declare Course_Desc: string;
    declare Course_Status: string;
    declare Course_Type: string;
    declare Course_Category: string;

    // associations
    declare learningJourneys?: NonAttribute<LearningJourneyModel[]>;
    declare skills?: NonAttribute<SkillModel[]>;

    declare static associations: {
        learningJourneys: Association<CourseModel, LearningJourneyModel>;
        skills: Association<CourseModel, SkillModel>;
    };

    // methods
    declare addSkill: BelongsToManyAddAssociationMixin<SkillModel, number>;
    declare countSkill: BelongsToManyCountAssociationsMixin;
    declare hasSkill: BelongsToManyHasAssociationMixin<SkillModel, number>;
    declare setSkill: BelongsToManySetAssociationsMixin<SkillModel, number>;
    declare getSkill: BelongsToManyGetAssociationsMixin<SkillModel>;
    declare removeSkill: BelongsToManyRemoveAssociationMixin<
        SkillModel,
        number
    >;
    declare createSkill: BelongsToManyCreateAssociationMixin<SkillModel>;

    declare addLearningJourney: BelongsToManyAddAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare countLearningJourney: BelongsToManyCountAssociationsMixin;
    declare hasLearningJourney: BelongsToManyHasAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare setLearningJourney: BelongsToManySetAssociationsMixin<
        LearningJourneyModel,
        number
    >;
    declare getLearningJourney: BelongsToManyGetAssociationsMixin<LearningJourneyModel>;
    declare removeLearningJourney: BelongsToManyRemoveAssociationMixin<
        LearningJourneyModel,
        number
    >;
    declare createLearningJourney: BelongsToManyCreateAssociationMixin<LearningJourneyModel>;
}

export const Course = CourseModel.init(
    {
        Course_ID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Course_Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Course_Desc: {
            type: DataTypes.STRING,
        },
        Course_Status: {
            type: DataTypes.STRING,
        },
        Course_Type: {
            type: DataTypes.STRING,
        },
        Course_Category: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'course',
        timestamps: false,
        sequelize,
    }
);
