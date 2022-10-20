import { Staff } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const staffs = Router();

// Login with email
staffs.post(
    '/login',
    celebrate({
        body: {
            email: Joi.string().required().email(),
        },
    }),
    async (req, res) => {
        try {
            const staff = await Staff.findOne({
                where: { Email: req.body.email },
            });

            if (staff === null) {
                throw new Error(`Staff does not exist`);
            } else {
                if (staff instanceof Staff) {
                    const system_role =
                        staff?.System_Role_ID == 1 ? 'Admin' : 'User';
                    res.json({
                        System_Role: system_role,
                        staff,
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
