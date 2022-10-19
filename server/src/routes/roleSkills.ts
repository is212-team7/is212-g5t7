import { RoleSkill, Skill } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roleSkills = Router();

// Get skills by role
roleSkills.get(
    '/:Role_ID',
    celebrate({ params: { Role_ID: Joi.number().required() } }),
    async (req, res) => {
        try {
            const skill_ids = await RoleSkill.findAll({
                where: { Role_ID: req.params.Role_ID },
                attributes: ['Skill_ID'],
            });
            if (!skill_ids) {
                return res.status(404).json({ error: 'Role not found' });
            } else {
                let result: any[] = [];
                for (let i = 0; i < skill_ids.length; i++) {
                    let skill_id = skill_ids[i]['Skill_ID'];
                    let skill = await Skill.findByPk(skill_id);
                    result.push(skill);
                }
                res.json(result);
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);
