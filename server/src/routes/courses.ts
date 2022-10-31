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
    '/skill/:Skill_ID',
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

// assign course to skill
courses.post(
    '/:Course_ID/skill/:Skill_ID',
    celebrate({
        params: {
            Course_ID: Joi.number().required(),
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
            const course = await Course.findByPk(req.params.Course_ID);
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
    '/:Course_ID/skill/:Skill_ID',
    celebrate({
        params: {
            Skill_ID: Joi.number().required(),
            Course_ID: Joi.number().required(),
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
            const course = await Course.findByPk(req.params.Course_ID);
            if (course == null) {
                return res.status(404).json({ error: 'Course not found' });
            }

            // remove association
            await course.removeSkill(skill);
            res.json('course successfully removed from skill');
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
);
