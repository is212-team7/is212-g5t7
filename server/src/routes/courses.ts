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

// TODO: view all courses that can be fulfilled by a skill
// refer to routes/skills => get skills by role

// TODO: assign course to skill
// refer to routes/skills => assign skills to role
