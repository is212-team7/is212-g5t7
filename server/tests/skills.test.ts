import { SkillModel } from '@lib/models/Skill';
import fetch from 'node-fetch';

const now = Date.now();

// Create skill
const newSkill = {
    Skill_Name: `Skill ${now}`,
    Skill_Category: `Category ${now}`,
    Skill_Description: `Description ${now}`,
};

const later = Date.now();
const updateSkill = {
    Skill_Name: `Skill ${later}`,
    Skill_Category: `Category ${later}`,
    Skill_Description: `Description ${later}`,
};

let skillId: number;

test('create skill', async () => {
    const skillCreateResponse = await fetch(`http://localhost:3001/skills`, {
        method: 'POST',
        body: JSON.stringify(newSkill),
        headers: { 'Content-Type': 'application/json' },
    });
    const skillCreated: SkillModel =
        (await skillCreateResponse.json()) as SkillModel;

    skillId = skillCreated!.Skill_ID;

    expect(skillCreated.Skill_Name).toBe(newSkill.Skill_Name);
    expect(skillCreated.Skill_Category).toBe(newSkill.Skill_Category);
    expect(skillCreated.Skill_Description).toBe(newSkill.Skill_Description);
    expect(skillCreated.Skill_Deleted).toBe(false);
});

test('get skill', async () => {
    const skillsResponse = await fetch(`http://localhost:3001/skills`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const skills = (await skillsResponse.json()) as SkillModel[];
    expect(Array.isArray(skills)).toBe(true);
});

test('get skill by id', async () => {
    const skillsResponse = await fetch(
        `http://localhost:3001/skills/${skillId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const skill = (await skillsResponse.json()) as SkillModel;
    expect(skill.Skill_Name).toBe(newSkill.Skill_Name);
    expect(skill.Skill_Category).toBe(newSkill.Skill_Category);
    expect(skill.Skill_Description).toBe(newSkill.Skill_Description);
    expect(skill.Skill_Deleted).toBe(false);
});

test('update skill', async () => {
    const skillUpdateResponse = await fetch(
        `http://localhost:3001/skills/${skillId}`,
        {
            method: 'PUT',
            body: JSON.stringify(updateSkill),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const skillUpdated: SkillModel =
        (await skillUpdateResponse.json()) as SkillModel;

    expect(skillUpdated.Skill_Name).toBe(updateSkill.Skill_Name);
    expect(skillUpdated.Skill_Category).toBe(updateSkill.Skill_Category);
    expect(skillUpdated.Skill_Description).toBe(updateSkill.Skill_Description);
    expect(skillUpdated.Skill_Deleted).toBe(false);
});

test('delete skill', async () => {
    await fetch(`http://localhost:3001/skills/${skillId}`, {
        method: 'DELETE',
    });

    const skillResponse = await fetch(
        `http://localhost:3001/skills/${skillId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const skill = (await skillResponse.json()) as SkillModel;
    expect(skill.Skill_Deleted).toBe(true);
});

afterAll(async () => {
    // Database cleanup
    // Delete skill ** from database ** (not soft delete)
    await fetch(`http://localhost:3001/skills/dev/${skillId}`, {
        method: 'DELETE',
    });
});
