import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { sequelize } from '../../database';
import { Role } from './Role';
import { Skill } from './Skill';

export class RoleSkillModel extends Model<
    InferAttributes<RoleSkillModel>,
    InferCreationAttributes<RoleSkillModel>
> {
    declare Role_ID: number;
    declare Skill_ID: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export const RoleSkill = RoleSkillModel.init(
    {
        Role_ID: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'Role_ID',
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
        tableName: 'RoleSkill',
        sequelize,
    }
);

// Associations
Role.belongsToMany(Skill, {
    through: RoleSkill,
    as: 'Skill',
    foreignKey: 'Role_ID',
});

Skill.belongsToMany(Role, {
    through: RoleSkill,
    as: 'Role',
    foreignKey: 'Skill_ID',
});
