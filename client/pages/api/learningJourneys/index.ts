import type { NextApiRequest, NextApiResponse } from 'next';

export type LearningJourneyAPI = {
    Staff_ID: number;
    Role_ID: number;
    Course_ID: number;
};

export type LearningJourney = {
    staffId: number;
    roleId: number;
    courseId: number;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LearningJourney[] | string | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/learningJourneys/';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: LearningJourneyAPI[]) => {
                    const parsed: LearningJourney[] = result.map(
                        (row: LearningJourneyAPI) => ({
                            staffId: row.Staff_ID,
                            roleId: row.Role_ID,
                            courseId: row.Course_ID,
                        })
                    );
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        case 'POST':
            const learningJourneyToCreate = req.body as LearningJourney;
            const bodyPost = JSON.stringify({
                Staff_ID: learningJourneyToCreate.staffId,
                Role_ID: learningJourneyToCreate.roleId,
                Course_ID: learningJourneyToCreate.courseId,
            });

            // TODO: This isn't working yet - check both POST and DELETE after backend comes together
            console.log({ learningJourneyToCreate, bodyPost });

            fetch(BASE_URL, {
                method: 'POST',
                body: bodyPost,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: LearningJourneyAPI) => {
                    res.status(200).json(
                        `Learning Journey (Staff ID: ${result.Staff_ID}, Role ID: ${result.Role_ID}, Course ID: ${result.Course_ID}) is created.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        case 'DELETE':
            const learningJourneyToDelete = JSON.parse(
                req.body
            ) as LearningJourney;
            const bodyDelete = JSON.stringify({
                Staff_ID: learningJourneyToDelete.staffId,
                Role_ID: learningJourneyToDelete.roleId,
                Course_ID: learningJourneyToDelete.courseId,
            });

            fetch(BASE_URL, {
                method: 'DELETE',
                body: bodyDelete,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(
                        `Learning Journey with values Staff ID: ${learningJourneyToDelete.staffId}, Role ID: ${learningJourneyToDelete.roleId}, Course ID: ${learningJourneyToDelete.courseId}} is deleted.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
