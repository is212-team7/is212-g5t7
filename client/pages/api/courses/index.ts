import type { NextApiRequest, NextApiResponse } from 'next';

export type CourseAPI = {
    Course_ID: string;
    Course_Name: string;
    Course_Desc: string;
    Course_Status: string;
    Course_Type: string;
    Course_Category: string;
    Course_Deleted: boolean;
};

export type Course = {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
    category: string;
    deleted: boolean;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Course[] | CourseAPI | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/courses/';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: CourseAPI[]) => {
                    const parsed: Course[] = result.map((row: CourseAPI) => {
                        return {
                            id: row.Course_ID,
                            name: row.Course_Name,
                            description: row.Course_Desc,
                            status: row.Course_Status,
                            type: row.Course_Type,
                            category: row.Course_Category,
                            deleted: row.Course_Deleted,
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
