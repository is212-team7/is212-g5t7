import type { NextApiRequest, NextApiResponse } from 'next';
import { Skill, SkillAPI } from '../';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Skill[] | string | { error: string }>
) {
    const { roleId } = req.query;
    const BASE_URL = process.env.API_URL + '/skills/role/' + roleId;

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

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
