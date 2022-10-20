import type { NextApiRequest, NextApiResponse } from 'next';
import { Skill, SkillAPI } from '.';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Skill | string | { error: string }>
) {
    const { skillId } = req.query;
    const BASE_URL = process.env.API_URL + '/skills/' + skillId;

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: SkillAPI) => {
                    const parsed: Skill = {
                        id: result.Skill_ID,
                        name: result.Skill_Name,
                        category: result.Skill_Category,
                        deleted: result.Skill_Deleted,
                        description: result.Skill_Description,
                    };
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        case 'PUT':
            const skillToUpdate = JSON.parse(req.body) as Skill;
            const body = JSON.stringify({
                Skill_Name: skillToUpdate.name,
                Skill_Category: skillToUpdate.category,
                Skill_Description: skillToUpdate.description,
            });

            fetch(BASE_URL, {
                method: 'PUT',
                body,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: SkillAPI) => {
                    res.status(200).json(
                        `Skill (${skillToUpdate.name}, ID: ${result.Skill_ID}) is updated.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        case 'DELETE':
            fetch(BASE_URL, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(`Skill ID of ${skillId} is deleted.`);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
