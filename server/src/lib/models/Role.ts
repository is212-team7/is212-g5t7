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
import { LearningJourneyModel } from './LearningJourney';
import { SkillModel } from './Skill';
import { StaffModel } from './Staff';

export class RoleModel extends Model<
    InferAttributes<RoleModel>,
    InferCreationAttributes<RoleModel>
> {
    declare Role_ID: CreationOptional<number>;
    declare Role_Name: string;
    declare Role_Description: string;
    declare Role_Deleted?: boolean;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // associations
    declare skills?: NonAttribute<SkillModel[]>;
    declare staffs?: NonAttribute<StaffModel[]>;

    declare static associations: {
        skills: Association<RoleModel, SkillModel>;
        staffs: Association<RoleModel, StaffModel>;
    };

    // methods
    // https://github.com/thrymgjol/typescript-sequelize-example/blob/master/app/models/class.ts
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
}

export const Role = RoleModel.init(
    {
        Role_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Role_Name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        Role_Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Role_Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'role',
        sequelize,
    }
);
