import { Role } from '@lib/models';
import { Router } from 'express';

export const roles = Router();

// Add role
roles.post('/add', async (req, res) => {
  try {
    // Example at https://github.com/MaxLeiter/Drift/blob/main/server/src/routes/posts.ts
    // ....
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get roles
roles.get('/roles', async (req, res, next) => {
  try {
    const roles = await Role.findAll({
      attributes: [], // e.g. ["id", "title", "description", "createdAt"]
    });
    res.json(roles);
  } catch (error) {
    next(error);
  }
});
