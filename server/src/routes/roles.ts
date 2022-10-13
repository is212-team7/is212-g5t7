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
    }
  }),
  async (req, res) => {
  try {
    // Example at https://github.com/MaxLeiter/Drift/blob/main/server/src/routes/posts.ts
    // ....
    const name = req.body.name.trim();
    if (name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    const newRole = await Role.create({
      name: name
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
      attributes: ["id","name"], // e.g. ["id", "title", "description", "createdAt"]
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
    const role = await Role.findByPk(id)

    if (!role) {
      return res.status(404).json({ error: "Role not found" })
    }

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

// Delete role name
roles.delete(
  "/:id",
  celebrate({ 
    params: {id: Joi.string().required()
  }}),

  async (req, res) => {
	try {
		const role = await Role.findByPk(req.params.id)
		if (!role) {
			return res.status(404).json({ error: "Role not found" })
		}
    else{
      await role.destroy()
		res.json({ message: "Role deleted" })
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
})
