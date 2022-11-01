import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | { error: string }>
) {
    const { learningJourneyId, courseId } = req.query;
    const BASE_URL =
        process.env.API_URL +
        '/learningJourneys/' +
        learningJourneyId +
        '/course/' +
        courseId;

    switch (req.method) {
        case 'DELETE':
            fetch(BASE_URL, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(
                        `Learning Journey of ID ${learningJourneyId} to Course of ID ${courseId} mapping is deleted.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
