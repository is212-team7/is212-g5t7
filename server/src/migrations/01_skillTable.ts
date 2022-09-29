"use strict"
import { DataTypes } from "sequelize"
import type { Migration } from "../database"

// This migration file helps us to set up and populate our database automatically
// (especially in prod when it's not easy to do it manually)

export const up: Migration = async ({ context: queryInterface }) =>
	queryInterface.createTable("skills", {
    // Should match src/lib/models/Skill.ts
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
      allowNull: false
		},
	})

export const down: Migration = async ({ context: queryInterface }) =>
	queryInterface.dropTable("skills")
