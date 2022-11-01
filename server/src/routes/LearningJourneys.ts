import { Course, LearningJourney, Role, Skill, Staff } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const learningJourneys = Router();

// Add Learning Journey
learningJourneys.post(
    '/',
    celebrate({
        body: {
            Staff_ID: Joi.number().required(),
            Role_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findByPk(req.body.Staff_ID);
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }

            const role = await Role.findByPk(req.body.Role_ID);
            if (!role) {
                return res.status(404).json({ error: 'role not found' });
            }

            if (
                (await LearningJourney.findOne({
                    where: {
                        Staff_ID: req.body.Staff_ID,
                        Role_ID: req.body.Role_ID,
                    },
                })) !== null
            ) {
                throw new Error('Only can create 1 learning journey per role');
            }

            await LearningJourney.create({
                Staff_ID: parseInt(req.body.Staff_ID),
                Role_ID: parseInt(req.body.Role_ID),
            });

            const learningJourneys = await LearningJourney.findOne({
                where: {
                    Staff_ID: req.body.Staff_ID,
                    Role_ID: req.body.Role_ID,
                },
                include: [
                    { model: Staff, as: 'Staff' },
                    { model: Role, as: 'Role' },
                ],
            });
            res.json(learningJourneys);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Add courses to learning journey
learningJourneys.post(
    '/courses/:LJ_ID',
    celebrate({
        params: {
            LJ_ID: Joi.number().required(),
        },
        body: {
            course_ids: Joi.array().items(Joi.string()).required(),
        },
    }),
    async (req, res) => {
        try {
            const learningJourney = await LearningJourney.findByPk(
                req.params.LJ_ID
            );
            if (!learningJourney) {
                throw new Error('Learning Journey not found');
            }

            for (let i = 0; i < req.body.course_ids.length; i++) {
                await learningJourney.addCourse(req.body.course_ids[i]);
            }

            const result = await LearningJourney.findByPk(req.params.LJ_ID, {
                include: [
                    {
                        model: Course,
                        as: 'Course',
                    },
                ],
            });

            res.json(result);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Get Learning Journey for staff
learningJourneys.get(
    '/staff/:Staff_ID',
    celebrate({
        params: {
            Staff_ID: Joi.number().required(),
        },
    }),
    async (req, res, next) => {
        try {
            const staff = await Staff.findByPk(req.params.Staff_ID);
            if (!staff) {
                return res.status(404).json({ error: 'staff not found' });
            }

            const learningJourneys = await LearningJourney.findAll({
                where: {
                    Staff_ID: req.params.Staff_ID,
                },
                include: [
                    // role associated with learning journey
                    {
                        model: Role,
                        as: 'Role',
                        attributes: {
                            exclude: ['PathwayModel'],
                        },
                        include: [
                            // all skills required by roles
                            {
                                model: Skill,
                                as: 'Skill',
                                attributes: [
                                    'Skill_ID',
                                    'Skill_Name',
                                    'Skill_Category',
                                    'Skill_Description',
                                ],
                            },
                        ],
                    },
                    // all courses in pathway chosen by user
                    {
                        model: Course,
                        as: 'Course',
                        attributes: {
                            exclude: ['Skill', 'PathwayModel'],
                        },
                        // skills that the course fulfil
                        include: [
                            {
                                model: Skill,
                                as: 'Skill',
                                attributes: [
                                    'Skill_ID',
                                    'Skill_Name',
                                    'Skill_Category',
                                    'Skill_Description',
                                ],
                            },
                        ],
                    },
                ],
            });

            res.json(learningJourneys);
        } catch (error) {
            next(error);
        }
    }
);

// Delete Learning Journey
learningJourneys.delete(
    '/:LJ_ID',
    celebrate({
        params: {
            LJ_ID: Joi.number().required(),
        },
    }),

    async (req, res) => {
        try {
            const selectedLearningJourney = await LearningJourney.findByPk(
                req.params.LJ_ID
            );
            if (!selectedLearningJourney) {
                return res
                    .status(404)
                    .json({ error: 'Learning Journey not found' });
            } else {
                await selectedLearningJourney.destroy();
                res.json({ message: 'Learning Journey deleted' });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// delete course from learning journey
learningJourneys.delete(
    '/:LJ_ID/course/:Course_ID',
    celebrate({
        params: {
            LJ_ID: Joi.number().required(),
            Course_ID: Joi.string().required(),
        },
    }),
    async (req, res) => {
        try {
            // check if skill exists
            const learningJourney = await LearningJourney.findByPk(
                req.params.LJ_ID
            );
            if (learningJourney == null) {
                return res
                    .status(404)
                    .json({ error: 'Learning Journey not found' });
            }

            // check if course exists
            const course = await Course.findByPk(req.params.Course_ID);
            if (course == null) {
                return res.status(404).json({ error: 'Course not found' });
            }

            // remove association
            await learningJourney.removeCourse(course);
            res.json('course successfully removed from learning Journey');
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
);
