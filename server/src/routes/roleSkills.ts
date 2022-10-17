import { RoleSkill } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roleSkills = Router();

// Get skills by role
roleSkills.get(
    "/:Role_ID",
    celebrate({ params: {Role_ID: Joi.string().required()}}),
    async (req, res, next) => {
    try {
        const Role_Skills = await RoleSkill.findByPk(req.params.Role_ID,{
            attributes: ["Role_ID", "Skill_ID"],})
        if (!Role_Skills) {
			return res.status(404).json({ error: "Role not found" })
		}
        else{
            res.json(Role_Skills);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})



