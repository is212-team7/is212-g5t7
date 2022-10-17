import { Skill } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const skills = Router();

// Add skill
skills.post(
  '/', 
  celebrate({ 
    body: {
      name: Joi.string().required(),
      category: Joi.string().required(),
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

// Get skill by id
skills.get(
  "/:Skill_ID",
  celebrate({ 
    params: {
      Skill_ID: Joi.string().required()
    }
  }),

async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.Skill_ID,{
    attributes: ["Skill_Name", "Skill_Category", "Skill_Description"],})
  if (!skill) {
      return res.status(404).json({ error: "skill not found" })
    }
  else{
      res.json(skill);
    }
  } catch (error) {
    res.status(400).json(error.message);
    }
  })



// Update skills
skills.put(
  '/:id', 
  celebrate({ 
    params: { 
      id: Joi.number().required()
    },
    body: {
      name: Joi.string().required(),
      category: Joi.string(),
      description: Joi.string()
    }
  }),
  async (req, res) => {
    try {
      const {id} = req.params
      const skill = await Skill.findOne({
        where: { id }
      });

      if (skill) {
        await skill.update(
          {
            name: req.body.name,
            category: req.body.category ?? undefined,
            description: req.body.description ?? undefined 
          }
        )
        res.json(skill);

      } else {
        throw new Error('Skill does not exist');
      }  

    } catch (error) {
      res.status(400).json(error.message);
    }
});



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
