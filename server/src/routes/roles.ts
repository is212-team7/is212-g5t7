import { Role } from '@lib/models/role';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roles = Router();

// Add role
roles.post(
  '/', 
  celebrate({ 
    body: {
      name: Joi.string().required(),
      description: Joi.string()
    }
  }),
  async (req, res) => {
  try {
    const name = req.body.name.trim();
    let description;
    if (req.body.description) {
      description = req.body.description.trim();
    }

    if (name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    const newRole = await Role.create({
      name: name,
      description: description
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
    const role = await Role.findAll({
      attributes: ["name", "description"], 
    });
    res.json(role);

  } catch (error) {
    next(error);
  }
});

// Update role name
roles.put(
  "/:id",
  celebrate({ 
    params: {
			id: Joi.string().required()
		},
    body: {
      name: Joi.string().required(),
    }
  }),
  
  async (req, res) => {
  try {
    const name = req.body.name.trim();
    const { id } = req.params
    if (name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    await Role.update(
        { name: name },
        { where: { id } }
      )

    res.json({ id, name });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
