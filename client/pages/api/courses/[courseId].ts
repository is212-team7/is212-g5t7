import type { NextApiRequest, NextApiResponse } from 'next';

type CourseAPI = {
    Course_ID: string;
    Course_Name: string;
    Course_Desc: string;
    Course_Status: string;
    Course_Type: string;
    Course_Category: string;
};

type Course = {
    id: string;
    name: string;
    description: string;
    status: string;
    type: string;
    category: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Course | { error: string }>
) {
    const { courseId } = req.query;

    switch (req.method) {
        case 'GET':
            fetch(process.env.API_URL + '/courses/' + courseId)
                .then((response) => response.json())
                .then((result: CourseAPI) => {
                    console.log({ result });
                    res.status(200).json({
                        id: result.Course_ID,
                        name: result.Course_Name,
                        description: result.Course_Desc,
                        status: result.Course_Status,
                        type: result.Course_Type,
                        category: result.Course_Category,
                    });
                })
                .catch((error) => res.status(500).json({ error }));
            break;

        default:
            break;
    }
}
