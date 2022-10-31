import { Course } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const courses = Router();

courses.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();

        if (!courses) {
            throw new Error(`Courses do not exist`);
        }

        res.json(courses);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// View course details
courses.get(
    '/:courseId',
    celebrate({
        params: {
            courseId: Joi.string().required(),
        },
    }),
    async (req, res) => {
        try {
            const course = await Course.findOne({
                where: { Course_ID: req.params.courseId },
            });

            if (!course) {
                throw new Error(`Course does not exist`);
            }
            res.json(course);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// view all courses that can be fulfilled by a skill
courses.get(
    '/Skill/:Skill_ID',
    celebrate({ params: { Skill_ID: Joi.number().required() } }),
    async (req, res) => {
        try {
            const skill = await Skill.findByPk(req.params.Skill_ID);

            if (skill == null) {
                return res.status(404).json({ error: 'Skill not found' });
            }

            const Courses = await skill.getCourse();
            res.json(Courses);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);
// TODO: assign course to skill
// refer to routes/skills => assign skills to role

// TODO: delete course-skill assignment
// refer to routes/skills delete skills-roles assignment
