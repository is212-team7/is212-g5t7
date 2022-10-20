'use strict';
import { DataTypes } from 'sequelize';
import type { Migration } from '../database';

// This migration file helps us to set up and populate our database automatically
// (especially in prod when it's not easy to do it manually)

export const up: Migration = async ({ context: queryInterface }) =>
	queryInterface.createTable("skill", {
    // Should match src/lib/models/Skill.ts
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
		}
	})

export const down: Migration = async ({ context: queryInterface }) =>
    queryInterface.dropTable('skill');
