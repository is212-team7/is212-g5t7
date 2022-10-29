import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from '../courses';
import { Role } from '../roles';
import { Skill } from '../skills';

export type LearningJourneyAPI = {
    Staff_ID: number;
    Role_ID: number;
    Course_ID: string;
};

export type LearningJourneyPost = {
    staffId: number;
    roleId: number;
    courseId: string;
};

// GET /learningJourneys/:User_ID
// returns LearningJourneyData[]
export type LearningJourneyData = {
    role: Role;
    coursesBySkill: {
        skill: Skill;
        courses: Course[];
    }[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        | LearningJourneyPost[]
        | LearningJourneyAPI[]
        | LearningJourneyData[]
        | string
        | { error: string }
    >
) {
    const BASE_URL = process.env.API_URL + '/learningJourneys/';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: LearningJourneyAPI[]) => {
                    const parsed: LearningJourneyPost[] = result.map(
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
            const learningJourneyToCreate: LearningJourneyPost = req.body;
            const body: LearningJourneyAPI = {
                Staff_ID: learningJourneyToCreate.staffId,
                Role_ID: learningJourneyToCreate.roleId,
                Course_ID: learningJourneyToCreate.courseId,
            };

            console.log({ body });

            fetch(BASE_URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => {
                    console.log({ response });
                    return response.json();
                })
                .then((result: LearningJourneyAPI) => {
                    if (
                        result.Staff_ID == null ||
                        result.Role_ID == null ||
                        result.Course_ID == null
                    ) {
                        res.status(400).json('Result is undefined.');
                        return;
                    }
                    res.status(200).json(
                        `Learning Journey (Staff ID: ${result.Staff_ID}, Role ID: ${result.Role_ID}, Course ID: ${result.Course_ID}) is created.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        case 'DELETE':
            const learningJourneyToDelete = req.body as LearningJourneyPost;
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
