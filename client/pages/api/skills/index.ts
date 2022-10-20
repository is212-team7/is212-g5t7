import type { NextApiRequest, NextApiResponse } from 'next';

export type SkillAPI = {
    Skill_ID: number;
    Skill_Name: string;
    Skill_Category: string;
    Skill_Deleted: boolean;
    Skill_Description?: string;
};

export type Skill = {
    id: number;
    name: string;
    category: string;
    deleted: boolean;
    description?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Skill[] | SkillAPI | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/skills/';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: SkillAPI[]) => {
                    const parsed: Skill[] = result.map((row: SkillAPI) => {
                        return {
                            id: row.Skill_ID,
                            name: row.Skill_Name,
                            category: row.Skill_Category,
                            deleted: row.Skill_Deleted,
                            description: row.Skill_Description,
                        };
                    });
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        case 'POST':
            const skillToCreate = req.body as Skill;
            const body = JSON.stringify({
                Skill_Name: skillToCreate.name,
                Skill_Category: skillToCreate.category,
                Skill_Description: skillToCreate.description,
            });

            fetch(BASE_URL, {
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: SkillAPI) => {
                    res.status(200).json(result);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
