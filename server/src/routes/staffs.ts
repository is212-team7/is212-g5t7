import { Staff } from '@lib/models';
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

// For dev purposes
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

// TODO: view staff skills
// refer to routes/skills => get skills by role
