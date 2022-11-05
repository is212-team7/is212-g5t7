import { CourseModel } from '@lib/models/Course';
import { SkillModel } from '@lib/models/Skill';
import fetch from 'node-fetch';

jest.setTimeout(10000);

test('assign course to skill', async () => {
    const now = Date.now();

    // Get a random course ID
    const courseId = 'COR001';

    // Create skill
    const newSkill = {
        Skill_Name: `Skill ${now}`,
        Skill_Category: `Category ${now}`,
        Skill_Description: `Description ${now}`,
    };

    const skillCreateResponse = await fetch(`http://localhost:3001/skills`, {
        method: 'POST',
        body: JSON.stringify(newSkill),
        headers: { 'Content-Type': 'application/json' },
    });
    const skillCreated = (await skillCreateResponse.json()) as SkillModel;
    const skillId: SkillModel['Skill_ID'] = skillCreated.Skill_ID;

    expect(skillCreated.Skill_Name).toBe(newSkill.Skill_Name);

    const assignCourseToSkillResponse = await fetch(
        `http://localhost:3001/courses/${courseId}/skill/${skillId}`,
        { method: 'POST' }
    );

    expect(assignCourseToSkillResponse.status).toBe(200);

    // Get couses by skill
    const coursesBySkillResponse = await fetch(
        `http://localhost:3001/courses/skill/${skillId}`
    );
    expect(coursesBySkillResponse.status).toBe(200);

    const coursesBySkill =
        (await coursesBySkillResponse.json()) as CourseModel[];
    const courseIdsSet = new Set(
        coursesBySkill.map((course) => course.Course_ID)
    );
    expect(courseIdsSet.has(courseId)).toBe(true);

    // Database cleanup
    // Delete skill-course association
    await fetch(`http://localhost:3001/courses/${courseId}/skill/${skillId}`, {
        method: 'DELETE',
    });

    // Delete skill ** from database ** (not soft delete)
    await fetch(`http://localhost:3001/skills/dev/${skillId}`, {
        method: 'DELETE',
    });
});
