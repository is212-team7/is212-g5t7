import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '../../database';

export interface RoleAttributes {
    Role_ID: string;
    Role_Name: string;
    Role_Description: string;
}

type RoleCreationAttributes = Optional<RoleAttributes, 'Role_ID'>;

export const Role: ModelDefined<RoleAttributes, RoleCreationAttributes> =
    sequelize.define('role', {
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
    });
