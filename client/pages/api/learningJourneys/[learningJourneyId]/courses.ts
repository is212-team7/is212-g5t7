import { LearningJourney, LearningJourneyServerResponseAPI } from '../';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LearningJourney | { error: string }>
) {
    const { learningJourneyId } = req.query;
    const BASE_URL =
        process.env.API_URL +
        '/learningJourneys/' +
        learningJourneyId +
        '/courses';

    switch (req.method) {
        case 'POST':
            fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify({ course_ids: req.body.courseIds }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: LearningJourneyServerResponseAPI) => {
                    const learningJourney = {
                        id: result.LJ_ID,
                        staffId: result.Staff_ID,
                        roleId: result.Role_ID,
                        role: {
                            id: result.Role.Role_ID,
                            name: result.Role.Role_Name,
                            description: result.Role.Role_Description,
                            deleted: result.Role.Role_Deleted,
                        },
                        course: result.Course.map((course) => ({
                            id: course.Course_ID,
                            name: course.Course_Name,
                            description: course.Course_Desc,
                            status: course.Course_Status,
                            type: course.Course_Type,
                            category: course.Course_Category,
                        })),
                    };
                    res.status(200).json(learningJourney);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
