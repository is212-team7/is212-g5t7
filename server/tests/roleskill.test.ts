import { SkillModel } from '@lib/models/Skill';
import fetch from 'node-fetch';

jest.setTimeout(10000);

const now = Date.now();
// Get a random role ID
const RoleId = 1;
// Create skill
const newSkill = {
    Skill_Name: `Skill ${now}`,
    Skill_Category: `Category ${now}`,
    Skill_Description: `Description ${now}`,
};

let skillId: number;

beforeAll(async () => {
    const skillCreateResponse = await fetch(`http://localhost:3001/skills`, {
        method: 'POST',
        body: JSON.stringify(newSkill),
        headers: { 'Content-Type': 'application/json' },
    });
    const skillCreated = (await skillCreateResponse.json()) as SkillModel;
    skillId = skillCreated.Skill_ID;
});

test('assign skills to role', async () => {
    // assign skill to role
    const assignRoleToSkillResponse = await fetch(
        `http://localhost:3001/skills/${skillId}/role/${RoleId}`,
        { method: 'POST' }
    );
    expect(assignRoleToSkillResponse.status).toBe(200);
});

test('get skills by role', async () => {
    // get skills by role
    const getRoleSkillResponse = await fetch(
        `http://localhost:3001/skills/role/${RoleId}`,
        { method: 'GET' }
    );
    expect(getRoleSkillResponse.status).toBe(200);
    const skills = (await getRoleSkillResponse.json()) as SkillModel[];
    expect(Array.isArray(skills)).toBe(true);
});

test('delete role skill association', async () => {
    // Delete skill-Role association
    const response = await fetch(
        `http://localhost:3001/skills/${skillId}/role/${RoleId}`,
        {
            method: 'DELETE',
        }
    );
    expect(response.status).toBe(200);
});

afterAll(async () => {
    // Database cleanup

    // Delete skill ** from database ** (not soft delete)
    await fetch(`http://localhost:3001/skills/dev/${skillId}`, {
        method: 'DELETE',
    });
});
