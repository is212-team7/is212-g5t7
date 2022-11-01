import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | { error: string }>
) {
    const { skillId, courseId } = req.query;
    const BASE_URL =
        process.env.API_URL + '/courses/' + courseId + '/skill/' + skillId;

    switch (req.method) {
        case 'POST':
            fetch(BASE_URL, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(
                        `Skill-Role association with Skill ID of ${skillId} and Course ID of ${courseId} is created.`
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
                    res.status(200).json(
                        `Skill-Role association with Skill ID of ${skillId} and Course ID of ${courseId} is deleted.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
