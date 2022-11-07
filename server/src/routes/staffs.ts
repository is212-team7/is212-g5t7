import { LearningJourney, Staff } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const staffs = Router();

// Login with email
staffs.post(
    '/login',
    celebrate({
        body: {
            Email: Joi.string().required().email(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findOne({
                where: { Email: req.body.Email },
            });

            if (staff === null) {
                throw new Error(`Staff does not exist`);
            } else {
                let System_Role = '';

                switch (staff.System_Role_ID) {
                    case 1:
                        System_Role = 'Admin';
                        break;
                    case 2:
                        System_Role = 'User';
                        break;
                    case 3:
                        System_Role = 'Manager';
                        break;
                    case 4:
                        System_Role = 'Trainer';
                        break;
                    default:
                        break;
                }
                if (staff instanceof Staff) {
                    res.json({
                        Staff_ID: staff.Staff_ID,
                        Staff_FName: staff.Staff_FName,
                        Staff_LName: staff.Staff_LName,
                        Dept: staff.Dept,
                        Email: staff.Email,
                        System_Role,
                    });
                }
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// View 1 staff detail
staffs.get(
    '/:Staff_ID',
    celebrate({
        params: {
            Staff_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findOne({
                where: { Staff_ID: req.params.Staff_ID },
            });

            if (!staff) {
                throw new Error(`Staff does not exist`);
            }
            res.json(staff);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// view all staff
staffs.get('/', async (req, res) => {
    try {
        const staffs = await Staff.findAll();

        if (!staffs) {
            throw new Error(`Staffs do not exist`);
        }
        res.json(staffs);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// view staff skills
staffs.get(
    '/:Staff_ID/skills',
    celebrate({
        params: {
            Staff_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findByPk(req.params.Staff_ID);

            if (!staff) {
                throw new Error(`Staff does not exist`);
            }

            const courses = await staff.getCourse();

            let skills: any = [];
            for (let i = 0; i < courses.length; i++) {
                let skill = await courses[i].getSkill(); // not retrieving anything; returns empty array
                if (skill.length > 0) {
                    for (let j = 0; j < skill.length; j++) {
                        skills.push(skill[j]);
                    }
                }
            }

            res.json(skills);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// view staff courses
staffs.get(
    '/:Staff_ID/courses',
    celebrate({
        params: {
            Staff_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findByPk(req.params.Staff_ID);

            if (!staff) {
                throw new Error(`Staff does not exist`);
            }

            const courses = await staff.getCourse();

            res.json(courses);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// get all staff IDs with at least one learning journey
staffs.get('/participating/ids', async (req, res) => {
    try {
        const learningJourneys = await LearningJourney.findAll();

        const staffIds = [
            ...new Set(learningJourneys.map((journey) => journey.Staff_ID)),
        ];

        res.status(200).json(staffIds);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
