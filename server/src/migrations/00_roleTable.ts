"use strict"
import { DataTypes } from "sequelize"
import type { Migration } from "../database"

// This migration file helps us to set up and populate our database automatically
// (especially in prod when it's not easy to do it manually)

export const up: Migration = async ({ context: queryInterface }) =>
	queryInterface.createTable("role", {
    // Should match src/lib/models/Role.ts
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
	})

export const down: Migration = async ({ context: queryInterface }) =>
	queryInterface.dropTable("role")

