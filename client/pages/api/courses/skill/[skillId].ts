import type { NextApiRequest, NextApiResponse } from 'next';
import { Course } from '..';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Course[] | string | { error: string }>
) {
    const { roleId } = req.query;
    const BASE_URL = process.env.API_URL + '/courses/skill/' + roleId;

    switch (req.method) {
        case 'GET':
            res.status(200).json([
                {
                    id: 'COR001',
                    name: 'Systems Thinking and Design',
                    description:
                        'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
                    status: 'Active',
                    type: 'Internal',
                    category: 'Core',
                },
                {
                    id: 'COR002',
                    name: 'Lean Six Sigma Green Belt Certification',
                    description:
                        'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics',
                    status: 'Active',
                    type: 'Internal',
                    category: 'Core',
                },
                {
                    id: 'COR004',
                    name: '	Service Excellence',
                    description:
                        'The programme provides the learner with the key foundations of what builds customer confidence in the service industr',
                    status: 'Active',
                    type: 'Internal',
                    category: 'Core',
                },
            ]);

            // TODO: Uncomment later
            // fetch(BASE_URL)
            //     .then((response) => response.json())
            //     .then((result: CourseAPI[]) => {
            // const parsed: Course[] = result.map((row: CourseAPI) => {
            //     return {
            //         id: row.Course_ID,
            //         name: row.Course_Name,
            //         description: row.Course_Desc,
            //         status: row.Course_Status,
            //         type: row.Course_Type,
            //         category: row.Course_Category,
            //     };
            // });
            // res.status(200).json(parsed);
            // })
            // .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
