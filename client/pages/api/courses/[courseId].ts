import type { NextApiRequest, NextApiResponse } from 'next';
import { Course, CourseAPI } from '.';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Course |string| { error: string }>
) {
    const { courseId } = req.query;
    const BASE_URL = process.env.API_URL + '/courses/' + courseId
    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: CourseAPI) => {
                    res.status(200).json({
                        id: result.Course_ID,
                        name: result.Course_Name,
                        description: result.Course_Desc,
                        status: result.Course_Status,
                        type: result.Course_Type,
                        category: result.Course_Category,
                        deleted: result.Course_Deleted,
                    });
                })
                .catch((error) => res.status(500).json({ error }));
            break;

            case 'DELETE':
                fetch(BASE_URL, {
                    method: 'DELETE',
                })
                    .then((response) => response.json())
                    .then(() => {
                        res.status(200).json(`Course ID of ${courseId} is deleted.`);
                    })
                    .catch((error) => console.log('error', error));
                break;
    
            default:
                res.status(400).json({ error: 'Invalid API endpoint.' });
                break;
    }

}
