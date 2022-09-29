import { Skill } from '@lib/models';
import { Router } from 'express';

export const skills = Router();

// Add skill
skills.post('/add', async (req, res) => {
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
    const skills = await Skill.findAll({
      attributes: ["name"], 
    });
    res.json(skills);
  } catch (error) {
    next(error);
  }
});
