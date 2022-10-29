import {
    Association,
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

    declare static associations: {
        roles: Association<StaffModel, RoleModel>;
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
