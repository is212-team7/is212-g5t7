import {
    Association,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
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
import { RoleModel } from './Role';
import { sequelize } from '../../database';
import { CourseModel } from './Course';

export class SkillModel extends Model<
    InferAttributes<SkillModel>,
    InferCreationAttributes<SkillModel>
> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare Skill_ID: CreationOptional<number>;
    declare Skill_Name: string;
    declare Skill_Category: string;
    declare Skill_Description: string;
    declare Skill_Deleted?: boolean;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // associations
    declare roles?: NonAttribute<RoleModel[]>;
    declare courses?: NonAttribute<CourseModel[]>;

    declare static associations: {
        roles: Association<SkillModel, RoleModel>;
        courses: Association<SkillModel, CourseModel>;
    };

    // methods
    declare addRole: BelongsToManyAddAssociationsMixin<RoleModel, number>;
    declare countRole: BelongsToManyCountAssociationsMixin;
    declare hasRole: BelongsToManyHasAssociationMixin<RoleModel, string>;
    declare setRole: BelongsToManySetAssociationsMixin<RoleModel, string>;
    declare getRole: BelongsToManyGetAssociationsMixin<RoleModel>;
    declare removeRole: BelongsToManyRemoveAssociationMixin<RoleModel, string>;
    declare createRole: BelongsToManyCreateAssociationMixin<RoleModel>;

    declare addCourse: BelongsToManyAddAssociationMixin<CourseModel, string>;
    declare countCourse: BelongsToManyCountAssociationsMixin;
    declare hasCourse: BelongsToManyHasAssociationMixin<CourseModel, string>;
    declare setCourse: BelongsToManySetAssociationsMixin<CourseModel, string>;
    declare getCourse: BelongsToManyGetAssociationsMixin<CourseModel>;
    declare removeCourse: BelongsToManyRemoveAssociationMixin<
        CourseModel,
        string
    >;
    declare createCourse: BelongsToManyCreateAssociationMixin<CourseModel>;
}

export const Skill = SkillModel.init(
    {
        Skill_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Skill_Name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        Skill_Category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Skill_Description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Skill_Deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'skill',
        sequelize,
    }
);
