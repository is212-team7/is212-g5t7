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
import { CourseModel } from './Course';
import { Role, RoleModel } from './Role';
import { Staff, StaffModel } from './Staff';

export class LearningJourneyModel extends Model<
    InferAttributes<LearningJourneyModel>,
    InferCreationAttributes<LearningJourneyModel>
> {
    declare LJ_ID: CreationOptional<number>;
    declare Staff_ID: number;
    declare Role_ID: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // foreign keys
    // declare Staff_ID: ForeignKey<StaffModel['Staff_ID']>;
    // declare Role_ID: ForeignKey<RoleModel['Role_ID']>;

    // associations
    declare courses?: NonAttribute<CourseModel[]>;
    declare staff?: NonAttribute<StaffModel>;
    declare role?: NonAttribute<RoleModel>;

    declare static associations: {
        courses: Association<LearningJourneyModel, CourseModel>;
        staff: Association<LearningJourneyModel, StaffModel>;
        role: Association<LearningJourneyModel, RoleModel>;
    };

    // methods
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

    declare addRole: HasManyAddAssociationMixin<RoleModel, number>;
    declare countRole: HasManyCountAssociationsMixin;
    declare hasRole: HasManyHasAssociationMixin<RoleModel, number>;
    declare setRole: HasManySetAssociationsMixin<RoleModel, number>;
    declare getRole: HasManyGetAssociationsMixin<RoleModel>;
    declare removeRole: HasManyRemoveAssociationMixin<RoleModel, number>;
    declare createRole: HasManyCreateAssociationMixin<RoleModel>;

    declare addStaff: HasManyAddAssociationMixin<StaffModel, number>;
    declare countStaff: HasManyCountAssociationsMixin;
    declare hasStaff: HasManyHasAssociationMixin<StaffModel, number>;
    declare setStaff: HasManySetAssociationsMixin<StaffModel, number>;
    declare getStaff: HasManyGetAssociationsMixin<StaffModel>;
    declare removeStaff: HasManyRemoveAssociationMixin<StaffModel, number>;
    declare createStaff: HasManyCreateAssociationMixin<StaffModel>;
}

export const LearningJourney = LearningJourneyModel.init(
    {
        LJ_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Staff_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Staff,
                key: 'Staff_ID',
            },
        },
        Role_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'Role_ID',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'LearningJourney',
        sequelize,
    }
);

// Staff.belongsToMany(Role, {
//     through: LearningJourney,
//     foreignKey: 'Staff_ID',
//     as: 'Role'
// })

// Role.belongsToMany(Staff, {
//     through: LearningJourney,
//     foreignKey: 'Role_ID',
//     as: 'Staff'
// })

Staff.hasMany(LearningJourney, {
    foreignKey: 'Staff_ID',
    as: 'LearningJourney',
});
LearningJourney.belongsTo(Staff, {
    foreignKey: 'Staff_ID',
    as: 'Staff',
});

Role.hasMany(LearningJourney, {
    foreignKey: 'Role_ID',
    as: 'LearningJourney',
});
LearningJourney.belongsTo(Role, {
    foreignKey: 'Role_ID',
    as: 'Role',
});
