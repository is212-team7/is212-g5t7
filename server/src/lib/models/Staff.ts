import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';

// export interface StaffAttributes {
//     Staff_ID: number;
//     Staff_FName?: string;
//     Staff_LName?: string;
//     Dept?: string;
//     Email?: string;
//     System_Role_ID?: number;
// }

// type StaffCreationAttributes = Optional<StaffAttributes, 'Staff_ID'>;

class StaffModel extends Model<
    InferAttributes<StaffModel>,
    InferCreationAttributes<StaffModel>
> {
    declare Staff_ID: number;
    declare Staff_FName?: string;
    declare Staff_LName?: string;
    declare Dept?: string;
    declare Email?: string;
    declare System_Role_ID: number;
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

// export const Staff: ModelDefined<StaffAttributes, StaffCreationAttributes> =
//      sequelize.define('staff', {
//         Staff_ID: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             allowNull: false,
//         },
//         Staff_FName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         Staff_LName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         Dept: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         Email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         System_Role_ID: {
//             type: DataTypes.INTEGER,
//         },
//     },
//     {
//         timestamps: false,
//     }
// );
