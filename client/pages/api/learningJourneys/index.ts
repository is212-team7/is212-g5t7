import type { NextApiRequest, NextApiResponse } from 'next';
import { Course, CourseAPI } from '../courses';
import { Role, RoleAPI } from '../roles';

export type LearningJourneyServerRequestAPI = {
    Staff_ID: number;
    Role_ID: number;
};

export type LearningJourneyServerResponseAPI = {
    LJ_ID: number;
    Staff_ID: number;
    Role_ID: number;
    Role: RoleAPI;
    Course: CourseAPI[];
};

export type LearningJourneyClientRequestAPI = {
    staffId: number;
    roleId: number;
};

// Aka LearningJourneyClientReponseAPI
export interface LearningJourney {
    id: number;
    staffId: number;
    roleId: number;
    role: Role;
    course: Course[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | LearningJourneyServerRequestAPI[]
        | LearningJourney[]
        | string
        | { error: string }
    >
) {
    const BASE_URL = process.env.API_URL + '/learningJourneys/';

    switch (req.method) {
        case 'POST':
            const learningJourneyToCreate: LearningJourneyClientRequestAPI =
                req.body;
            const body: LearningJourneyServerRequestAPI = {
                Staff_ID: learningJourneyToCreate.staffId,
                Role_ID: learningJourneyToCreate.roleId,
            };

            fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => {
                    console.log({ response });
                    return response.json();
                })
                .then((result: LearningJourneyServerResponseAPI) => {
                    if (result.Staff_ID == null || result.Role_ID == null) {
                        res.status(400).json('Result is undefined.');
                        return;
                    }
                    res.status(200).json(
                        `Learning Journey (Staff ID: ${result.Staff_ID}, Role ID: ${result.Role_ID} is created.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        case 'DELETE':
            const learningJourneyToDelete =
                req.body as LearningJourneyClientRequestAPI;
            const bodyDelete = JSON.stringify({
                Staff_ID: learningJourneyToDelete.staffId,
                Role_ID: learningJourneyToDelete.roleId,
            });

            fetch(BASE_URL, {
                method: 'DELETE',
                body: bodyDelete,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(
                        `Learning Journey with values Staff ID: ${learningJourneyToDelete.staffId}, Role ID: ${learningJourneyToDelete.roleId} is deleted.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
