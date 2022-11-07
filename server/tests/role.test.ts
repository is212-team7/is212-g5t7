import { RoleModel } from '@lib/models/Role';
import fetch from 'node-fetch';

const now = Date.now();

// Create Role
const newRole = {
    Role_Name: `Role ${now}`,
    Role_Description: `Description ${now}`,
};
// Update Role
const later = Date.now();
const updateRole = {
    Role_Name: `Role ${later}`,
    // Role_Description: `Description ${later}`,
};

let roleId: number;

test('create Role', async () => {
    const roleCreateResponse = await fetch(`http://localhost:3001/roles`, {
        method: 'POST',
        body: JSON.stringify(newRole),
        headers: { 'Content-Type': 'application/json' },
    });
    const roleCreated: RoleModel =
        (await roleCreateResponse.json()) as RoleModel;

        roleId = roleCreated!.Role_ID;

    expect(roleCreated.Role_Name).toBe(newRole.Role_Name);
    expect(roleCreated.Role_Description).toBe(newRole.Role_Description);
    expect(roleCreated.Role_Deleted).toBe(false);
});

test('get role', async () => {
    const rolesResponse = await fetch(`http://localhost:3001/roles`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const roles = (await rolesResponse.json()) as RoleModel[];
    expect(Array.isArray(roles)).toBe(true);
});

test('get role by id', async () => {
    const rolesResponse = await fetch(
        `http://localhost:3001/roles/${roleId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const role = (await rolesResponse.json()) as RoleModel;
    expect(role.Role_Name).toBe(newRole.Role_Name);
    expect(role.Role_Description).toBe(newRole.Role_Description);
    expect(role.Role_Deleted).toBe(false);
});

test('update role', async () => {
    const roleUpdateResponse = await fetch(
        `http://localhost:3001/roles/${roleId}`,
        {
            method: 'PUT',
            body: JSON.stringify(updateRole),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const roleUpdated: RoleModel =
        (await roleUpdateResponse.json()) as RoleModel;

    expect(roleUpdated.Role_Name).toBe(updateRole.Role_Name);
    // expect(roleUpdated.Role_Description).toBe(updateRole.Role_Description);
    // expect(roleUpdated.Role_Deleted).toBe(false);
});

test('delete role', async () => {
    await fetch(`http://localhost:3001/roles/${roleId}`, {
        method: 'DELETE',
    });

    const roleResponse = await fetch(
        `http://localhost:3001/roles/${roleId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const role = (await roleResponse.json()) as RoleModel;
    expect(role.Role_Deleted).toBe(true);
});

afterAll(async () => {
    // Database cleanup
    // Delete role ** from database ** (not soft delete)
    await fetch(`http://localhost:3001/roles/dev/${roleId}`, {
        method: 'DELETE',
    });
});
