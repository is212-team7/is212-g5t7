import { Role } from '@lib/models';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

export const roles = Router();

// Add role
roles.post(
  '/', 
  celebrate({ 
    body: {
      Role_Name: Joi.string().required(),
      Role_Description: Joi.string()
    }
  }),
  async (req, res) => {
  try {
    const Role_Name = req.body.Role_Name.trim();
    let Role_Description;
    if (req.body.Role_Description) {
      Role_Description = req.body.Role_Description.trim();
    }

    if (Role_Name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    const newRole = await Role.create({
      Role_Name: Role_Name,
      Role_Description: Role_Description
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
      attributes: ["Role_ID", "Role_Name", "Role_Description"], 
    });
    res.json(role);

  } catch (error) {
    next(error);
  }
});

// Update role name by role id
roles.put(
  "/:id",
  celebrate({ 
    params: {
			Role_ID: Joi.string().required()
		},
    body: {
      Role_Name: Joi.string().required(),
    }
  }),
  
  async (req, res) => {
  try {
    const Role_Name = req.body.Role_Name.trim();
    const { Role_ID } = req.params
    const role = await Role.findByPk(Role_ID)

    if (!role) {
      return res.status(404).json({ error: "Role not found" })
    }

    if (Role_Name.length === 0) {
      throw new Error('Name of roles must be specified.')
    }

    await Role.update(
        { Role_Name: Role_Name },
        { where: { Role_ID } }
      )

    res.json({ Role_ID, Role_Name });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Delete role by role id
roles.delete(
  "/:id",
  celebrate({ 
    params: {Role_ID: Joi.string().required()
  }}),

  async (req, res) => {
	try {
		const role = await Role.findByPk(req.params.Role_ID)
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
