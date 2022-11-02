import type { NextApiRequest, NextApiResponse } from 'next';
import { Course, CourseAPI } from '../../courses';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Course[] | string | { error: string }>
) {
    const { staffId } = req.query;
    const BASE_URL = process.env.API_URL + '/staffs/' + staffId + '/courses';

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
