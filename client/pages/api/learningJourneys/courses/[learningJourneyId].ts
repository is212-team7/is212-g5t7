import { LearningJourney, LearningJourneyServerResponseAPI } from '..';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Omit<LearningJourney, 'role'> | { error: string }>
) {
    const { learningJourneyId } = req.query;
    const BASE_URL =
        process.env.API_URL + '/learningJourneys/courses/' + learningJourneyId;

    switch (req.method) {
        case 'POST':
            fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify({ course_ids: req.body.courseIds }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then(
                    (
                        result: Omit<LearningJourneyServerResponseAPI, 'role'>
                    ) => {
                        const learningJourney = {
                            id: result.LJ_ID,
                            staffId: result.Staff_ID,
                            roleId: result.Role_ID,
                            course: result.Course.map((course) => ({
                                id: course.Course_ID,
                                name: course.Course_Name,
                                description: course.Course_Desc,
                                status: course.Course_Status,
                                type: course.Course_Type,
                                category: course.Course_Category,
                                deleted: course.Course_Deleted,
                            })),
                        };
                        res.status(200).json(learningJourney);
                    }
                )
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
