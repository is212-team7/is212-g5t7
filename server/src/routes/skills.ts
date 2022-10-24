import { RoleSkill, Skill } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const skills = Router();

// Add skill
skills.post(
    '/',
    celebrate({
        body: {
            Skill_Name: Joi.string().required(),
            Skill_Category: Joi.string().required(),
            Skill_Description: Joi.string(),
        },
    }),
    async (req, res) => {
        try {
            const Skill_Name = req.body.Skill_Name.trim();
            const Skill_Category = req.body.Skill_Category.trim();

            let Skill_Description = null;
            if (req.body.Skill_Description) {
                Skill_Description = req.body.Skill_Description.trim();
            }

            if (Skill_Name.length === 0) {
                throw new Error('Skill_Name of skill must be specified.');
            }

            const newSkill = await Skill.create({
                Skill_Name: Skill_Name,
                Skill_Category: Skill_Category,
                Skill_Description: Skill_Description,
            });

            await newSkill.save();
            res.json(newSkill);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Get skills
skills.get('/', async (req, res, next) => {
    try {
        const skills = await Skill.findAll();
        res.json(skills);
    } catch (error) {
        next(error);
    }
});

// Get skill by id
skills.get(
    '/:Skill_ID',
    celebrate({
        params: {
            Skill_ID: Joi.number().required(),
        },
    }),

    async (req, res) => {
        try {
            const skill = await Skill.findByPk(req.params.Skill_ID);
            if (!skill) {
                return res.status(404).json({ error: 'skill not found' });
            } else {
                res.json(skill);
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Update skills
skills.put(
    '/:Skill_ID',
    celebrate({
        params: {
            Skill_ID: Joi.number().required(),
        },
        body: {
            Skill_Name: Joi.string(),
            Skill_Category: Joi.string(),
            Skill_Description: Joi.string(),
            Skill_Deleted: Joi.boolean(),
        },
    }),
    async (req, res) => {
        try {
            console.log('TRYING TO UPDATE');
            const Skill_ID = req.params.Skill_ID;
            const skill = await Skill.findByPk(Skill_ID);
            console.log('Updating skill: ', Skill_ID);

            if (skill) {
                await skill.update({
                    Skill_Name: req.body.Skill_Name,
                    Skill_Category:
                        req.body.Skill_Category ??
                        skill.get('Skill_Category') ??
                        undefined,
                    Skill_Description:
                        req.body.Skill_Description ??
                        skill.get('Skill_Description') ??
                        undefined,
                    Skill_Deleted:
                        req.body.Skill_Deleted ??
                        skill.get('Skill_Deleted') ??
                        undefined,
                });

                res.json(skill);
            } else {
                throw new Error('Skill does not exist');
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Delete skill
skills.delete(
    '/:Skill_ID',
    celebrate({
        params: {
            Skill_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const skill = await Skill.findByPk(req.params.id);
            if (!skill) {
                throw new Error('Skill not found');
            } else {
                await skill.update({ Skill_Deleted: true });
                res.json({ message: 'Skill deleted' });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Get skills by role
skills.get(
    '/role/:Role_ID',
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
