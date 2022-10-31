import { Course, Skill } from '@lib/models';
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
    celebrate({ params: { Skill_ID: Joi.string().required() } }),
    async (req, res) => {
        try {
            const skill = await Skill.findByPk(req.params.Skill_ID);
            if (skill == null) {
                return res.status(404).json({ error: 'Skill not found' });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// assign course to skill
courses.post(
    '/:courseId/skill/:Skill_ID',
    celebrate({
        params: {
            courseId: Joi.string().required(),
            Skill_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            // check if skill exists
            const skill = await Skill.findByPk(req.params.Skill_ID);
            if (skill == null) {
                return res.status(404).json({ error: 'Skill not found' });
            }
            
            // check if course exists
            const course: any = await Course.findByPk(req.params.courseId);
            if (course == null) {
                return res.status(404).json({ error: 'Course not found' });
            }

            // assign course to role
            await skill.addCourse(course);

            return res.json('Sucessfully added course to skill');

        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);


// delete course-skill assignment
courses.delete(
    '/:courseId/skill/:Skill_ID',
    celebrate({
        params: {
            Skill_ID: Joi.number().required(),
            courseId: Joi.string().required(),
        },
    }),
    async (req, res) => {
        try {
            // check if skill exists
            const skill = await Skill.findByPk(req.params.Skill_ID);
            if (skill == null) {
                return res.status(404).json({ error: 'Skill not found' });
            }

            // check if course exists
            const course: any = await Course.findByPk(req.params.courseId);
            if (course == null) {
                return res.status(404).json({ error: 'Course not found' });
            }

            // remove association
            await course.removeCourse(course);
            res.json('course successfully removed from skill');
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
);