import { Role } from '@lib/models/role';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roles = Router();

// Add role
roles.post(
  '/add', 
  celebrate({ 
    body: {
      name: Joi.string().required(),
    }
  }),
  async (req, res) => {
  try {
    // Example at https://github.com/MaxLeiter/Drift/blob/main/server/src/routes/posts.ts
    // ....
    const name = req.body.name.trim();
    if (name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    const newRole = await Role.create({
      name: name
    })
    await newRole.save();
    res.json(newRole);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Get roles
roles.get('/', async (req, res, next) => {
  try {
    const posts = await Role.findAll({
      attributes: [], // e.g. ["id", "title", "description", "createdAt"]
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});
