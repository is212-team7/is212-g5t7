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
