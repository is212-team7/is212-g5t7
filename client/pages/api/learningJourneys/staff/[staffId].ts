import { LearningJourney, LearningJourneyServerResponseAPI } from '..';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LearningJourney[] | { error: string }>
) {
    const { staffId } = req.query;
    const BASE_URL = process.env.API_URL + '/learningJourneys/staff/' + staffId;

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: LearningJourneyServerResponseAPI[]) => {
                    const parsed: LearningJourney[] = result.map(
                        (learningJourney) => ({
                            id: learningJourney.LJ_ID,
                            staffId: learningJourney.Staff_ID,
                            roleId: learningJourney.Role_ID,
                            role: {
                                id: learningJourney.Role.Role_ID,
                                name: learningJourney.Role.Role_Name,
                                description:
                                    learningJourney.Role.Role_Description,
                                deleted: learningJourney.Role.Role_Deleted,
                            },
                            course: learningJourney.Course.map((course) => ({
                                id: course.Course_ID,
                                name: course.Course_Name,
                                description: course.Course_Desc,
                                status: course.Course_Status,
                                type: course.Course_Type,
                                category: course.Course_Category,
                            })),
                        })
                    );
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
