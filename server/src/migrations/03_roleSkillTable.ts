"use strict"
import { DataTypes } from "sequelize"
import type { Migration } from "../database"

// This migration file helps us to set up and populate our database automatically
// (especially in prod when it's not easy to do it manually)

export const up: Migration = async ({ context: queryInterface }) =>
	queryInterface.createTable("RoleSkill", {
    // Should match src/lib/models/Skill.ts
        Role_ID: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
        },
        Skill_ID: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
	})

export const down: Migration = async ({ context: queryInterface }) =>
	queryInterface.dropTable("RoleSkill")
