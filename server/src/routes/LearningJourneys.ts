import { LearningJourney } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const learningJourneys = Router();

// Add Learning Journey
learningJourneys.post(
  '/',
  celebrate({
    body: {
      Staff_ID: Joi.string().required(),
      Role_ID: Joi.string().required(),
      Course_ID: Joi.string().required(),
    },
  }),
  async (req, res) => {
    try {
      const Staff_ID = req.body.Staff_ID.trim();
      const Role_ID = req.body.Role_ID.trim();
      const Course_ID = req.body.Course_ID.trim();

      const newLearningJourney = await LearningJourney.create({
        Staff_ID: Staff_ID,
        Role_ID: Role_ID,
        Course_ID: Course_ID,
      });
      await newLearningJourney.save();
      res.json(newLearningJourney);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
);

// Get Learning Journey
learningJourneys.get('/', async (req, res, next) => {
  try {
    const learningJourney = await LearningJourney.findAll({
      attributes: ['Staff_ID', 'Role_ID', 'Course_ID'],
    });
    res.json(learningJourney);
  } catch (error) {
    next(error);
  }
});

// Delete Learning Journey
learningJourneys.delete(
  '/:Course_ID',
  celebrate({
    params: { Course_ID: Joi.string().required() },
  }),

  async (req, res) => {
    try {
      const selectedLearningJourney = await LearningJourney.findByPk(
        req.params.Course_ID
      );
      if (!selectedLearningJourney) {
        return res.status(404).json({ error: 'Learning Journey not found' });
      } else {
        await selectedLearningJourney.destroy();
        res.json({ message: 'Learning Journey deleted' });
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
);
