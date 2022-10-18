import { LearningJourney } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const learningJourneys = Router();

// Add Learning Journey
learningJourneys.post(
  '/',
  celebrate({
    body: {
      Staff_ID: Joi.number().required(),
      Role_ID: Joi.number().required(),
      Course_ID: Joi.number().required(),
    },
  }),
  async (req, res) => {
    try {
      const newLearningJourney = await LearningJourney.create({
        Staff_ID: req.body.Staff_ID,
        Role_ID: req.body.Role_ID,
        Course_ID: req.body.Course_ID,
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
  '/',
  celebrate({
    body: { 
      Course_ID: Joi.number().required(),
      Staff_ID: Joi.number().required(),
      Role_ID: Joi.number().required
    }
  }),

  async (req, res) => {
    try {
      const selectedLearningJourney = await LearningJourney.findOne({
        where: { 
          CourseID: req.params.Course_ID,
          Staff_ID: req.body.Staff_ID,
          Role_ID: req.body.Role_ID
        }
      });
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
