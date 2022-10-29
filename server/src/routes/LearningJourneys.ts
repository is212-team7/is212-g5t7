import { Course, LearningJourney, Role, Staff } from '@lib/models';
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
    '/:LJ_ID/courses',
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
    '/:Staff_ID',
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
                    {
                        model: Role,
                        as: 'Role',
                    },
                    {
                        model: Course,
                        as: 'Course',
                    },
                ],
            });

            res.json(learningJourneys);
        } catch (error) {
            next(error);
        }
    }
);

// // Delete Learning Journey
// learningJourneys.delete(
//     '/',
//     celebrate({
//         body: {
//             Course_ID: Joi.string().required(),
//             Staff_ID: Joi.number().required(),
//             Role_ID: Joi.number().required,
//         },
//     }),

//     async (req, res) => {
//         try {
//             const selectedLearningJourney = await LearningJourney.findOne({
//                 where: {
//                     CourseID: req.params.Course_ID,
//                     Staff_ID: req.body.Staff_ID,
//                     Role_ID: req.body.Role_ID,
//                 },
//             });
//             if (!selectedLearningJourney) {
//                 return res
//                     .status(404)
//                     .json({ error: 'Learning Journey not found' });
//             } else {
//                 await selectedLearningJourney.destroy();
//                 res.json({ message: 'Learning Journey deleted' });
//             }
//         } catch (error) {
//             res.status(400).json(error.message);
//         }
//     }
// );
