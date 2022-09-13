import { Skill } from '@lib/models';
import { Router } from 'express';

export const skills = Router();

// Add skill
skills.post('/addSkill', async (req, res) => {
  try {
    // Example at https://github.com/MaxLeiter/Drift/blob/main/server/src/routes/posts.ts
    // ....
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get skills
skills.get('/', async (req, res, next) => {
  try {
    const posts = await Skill.findAll({
      attributes: [], // e.g. ["id", "title", "description", "createdAt"]
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});
