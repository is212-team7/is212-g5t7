import { Role } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roles = Router();

// Add role
roles.post(
    '/',
    celebrate({
        body: {
            Role_Name: Joi.string().required(),
            Role_Description: Joi.string(),
        },
    }),
    async (req, res) => {
        try {
            const Role_Name = req.body.Role_Name.trim();
            const Role_Description = (req.body.Role_Description ?? '').trim();

            if (Role_Name.length === 0) {
                throw new Error('Name of roles must be specified.');
            }

            const newRole = await Role.create({
                Role_Name: Role_Name,
                Role_Description: Role_Description,
            });
            await newRole.save();
            res.json(newRole);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Get roles
roles.get('/', async (req, res, next) => {
    try {
        const role = await Role.findAll();
        res.json(role);
    } catch (error) {
        next(error);
    }
});

// Get 1 role by role ID
roles.get(
    '/:Role_ID',
    celebrate({
        params: {
            Role_ID: Joi.number().required(),
        },
    }),
    async (req, res) => {
        try {
            const role = await Role.findByPk(req.params.Role_ID);

            if (role === null) {
                return Error('Role not found');
            }

            res.json(role);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Update role by role id
roles.put(
    '/:Role_ID',
    celebrate({
        params: {
            Role_ID: Joi.number().required(),
        },
        body: {
            Role_Name: Joi.string().required(),
            Role_Description: Joi.string(),
        },
    }),

    async (req, res) => {
        try {
            const { Role_ID } = req.params;
            const role = await Role.findByPk(Role_ID);

            const Role_Name =
                req.body.Role_Name.trim() ?? role?.Role_Name ?? '';
            const Role_Description = (
                req.body.Role_Description ??
                '' ??
                role?.Role_Description
            ).trim();

            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            }

            if (Role_Name.length === 0) {
                throw new Error('Name of roles must be specified.');
            }

            await Role.update(
                { Role_Name, Role_Description },
                { where: { Role_ID } }
            );

            res.json({ Role_ID, Role_Name });
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);

// Delete role by role id
roles.delete(
    '/:Role_ID',
    celebrate({
        params: { Role_ID: Joi.number().required() },
    }),

    async (req, res) => {
        try {
            const role = await Role.findByPk(req.params.Role_ID);
            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            } else {
                await role.update({ Role_Deleted: true });
                res.json({ message: 'Role deleted' });
            }
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
);
