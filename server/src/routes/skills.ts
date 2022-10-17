import { Skill } from '@lib/models';
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
        const skills = await Skill.findAll({
            attributes: [
                'Skill_ID',
                'Skill_Name',
                'Skill_Category',
                'Skill_Description',
            ],
        });
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
            const skill = await Skill.findByPk(req.params.Skill_ID, {
                attributes: [
                    'Skill_Name',
                    'Skill_Category',
                    'Skill_Description',
                ],
            });
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
            Skill_Name: Joi.string().required(),
            Skill_Category: Joi.string(),
            Skill_Description: Joi.string(),
        },
    }),
    async (req, res) => {
        try {
            const Skill_ID = req.params.Skill_ID;
            const skill = await Skill.findByPk(Skill_ID);

            if (skill) {
                await skill.update({
                    Skill_Name: req.body.Skill_Name,
                    Skill_Category: req.body.Skill_Category ?? undefined,
                    Skill_Description: req.body.Skill_Description ?? undefined,
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
    '/:id',
    celebrate({
        params: {
            id: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const skill = await Skill.findByPk(req.params.id);
            if (!skill) {
                throw new Error('Skill not found');
            } else {
                await skill.destroy();
                res.json({ message: 'Skill deleted' });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);
