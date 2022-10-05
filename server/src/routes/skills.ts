import { Skill } from '@lib/models/Skill';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const skills = Router();

// Add skill
skills.post(
  '/', 
  celebrate({ 
    body: {
      name: Joi.string().required(),
    }
  }),
  async (req, res) => {

  try {
    // Example at https://github.com/MaxLeiter/Drift/blob/main/server/src/routes/posts.ts

    const name = req.body.name.trim();
    if (name.length === 0) {
      throw new Error('Name of skill must be specified.')
    }

    const newSkill = await Skill.create({
      name: name
    })

    await newSkill.save();
    res.json(newSkill);
    
  } catch (error) {
    res.status(400).json(error.message);
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
