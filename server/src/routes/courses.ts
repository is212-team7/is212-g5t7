import { Course } from '@lib/models/course';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const courses = Router();

// View course details
courses.get(
    '/:courseId', 
    celebrate({
        params: {
            courseId: Joi.string().required()
        }
    }),
    async (req, res) => {
    try {
        const course = await Course.findOne({
            where: { Course_ID : req.params.courseId }
        });
        
        if (!course) {
            throw new Error(`Course does not exist`);
        }
        res.json(course);

    } catch (error) {
        res.status(400).json(error.message);
    }
});
