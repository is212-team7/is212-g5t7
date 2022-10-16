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
      category: Joi.string(),
      description: Joi.string()
    }
  }),
  async (req, res) => {

  try {
    const name = req.body.name.trim();
    const category = req.body.category.trim();

    let description = null;
    if (req.body.description) {
      description = req.body.description.trim();
    }

    if (name.length === 0) {
      throw new Error('Name of skill must be specified.')
    }

    const newSkill = await Skill.create({
      name: name,
      category: category,
      description: description
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
      attributes: ["name", "category", "description"], 
    });
    res.json(skills);
  } catch (error) {
    next(error);
  }
});

// Get skills by id
skills.get(
  "/:Skill_ID",
  celebrate({ 
    params: {
      Skill_ID: Joi.string().required()
    }
  }),

async (req, res) => {
  try {
    const skills = await Skill.findByPk(req.params.Skill_ID,{
    attributes: ["Skill_Name", "Skill_Category", "Skill_Description"],})
  if (!skills) {
      return res.status(404).json({ error: "skills not found" })
    }
  else{
      res.json(skills);
    }
  } catch (error) {
    res.status(400).json(error.message);
    }
  })



// Delete role name
skills.delete(
  "/:id",
  celebrate({ 
    params: {
      id: Joi.number().required()
    }
  }),
  async (req, res) => {
	try {
		const skill = await Skill.findByPk(req.params.id)
		if (!skill) {
			throw new Error("Skill not found")
		} else {
      await skill.destroy()
		  res.json({ message: "Skill deleted" })
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
})