import { LearningJourneyData } from '.';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<LearningJourneyData[] | string | { error: string }>
) {
    const { roleId } = req.query;
    const BASE_URL = process.env.API_URL + '/roles/' + roleId;

    switch (req.method) {
        case 'GET':
            // fetch(BASE_URL)
            //     .then((response) => response.json())
            //     .then((result: RoleAPI) => {
            //         const parsed: Role = {
            //             id: result.Role_ID,
            //             name: result.Role_Name,
            //             deleted: result.Role_Deleted,
            //             description: result.Role_Description,
            //         };
            //         res.status(200).json(parsed);
            //     })
            //     .catch((error) => console.log('error', error));

            const data: LearningJourneyData[] = [
                {
                    role: {
                        id: '1',
                        name: 'Dentist',
                        description: 'Clean teeth',
                        deleted: false,
                    },
                    coursesBySkill: [
                        {
                            skill: {
                                id: 2,
                                name: 'Use surgical tools',
                                category: 'Practical',
                                deleted: false,
                                description:
                                    'Use various metallic and non-metallic scary tools',
                            },
                            courses: [
                                {
                                    id: 'DEN100',
                                    name: 'Cleaning Instruments',
                                    description:
                                        'Learn how to sanitze your dental instruments.',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'DEN101',
                                    name: 'Mouth Washing',
                                    description:
                                        "Clean your patients' mouth thoroughly.",
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'DEN103',
                                    name: 'Tooth Extraction',
                                    description:
                                        'Remove decayed and wisdom teeth.',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                            ],
                        },
                    ],
                },
                {
                    role: {
                        id: '2',
                        name: 'Web Developer',
                        description: 'Make web applications',
                        deleted: false,
                    },
                    coursesBySkill: [
                        {
                            skill: {
                                id: 2,
                                name: 'Basics of Web Development',
                                category: 'Non-Practical',
                                deleted: false,
                                description:
                                    'Learn how to build basic CRUD apps.',
                            },
                            courses: [
                                {
                                    id: 'COR100',
                                    name: 'Web Development 1',
                                    description: 'Learn HTML, CSS and JS',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'COR101',
                                    name: 'Web Development 2',
                                    description: 'Learn Vue and PHP',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'COR103',
                                    name: 'Database Management',
                                    description: 'Learn MySQL',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                            ],
                        },
                        {
                            skill: {
                                id: 3,
                                name: 'Project Management',
                                category: 'Non-Practical',
                                deleted: false,
                                description: 'Learn how to manage projects',
                            },
                            courses: [
                                {
                                    id: 'COR200',
                                    name: 'Software Project Management',
                                    description: 'Scrum, VCS, GitHub.',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'COR201',
                                    name: 'Digital Business Transformation',
                                    description:
                                        'Learn the basics of every type of technology under the sun.',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                                {
                                    id: 'COR203',
                                    name: 'Technopreneurship',
                                    description:
                                        'Go overseas and explore tech companies and startups.',
                                    status: 'Active',
                                    type: 'Half a semester',
                                    category: 'Beginner',
                                },
                            ],
                        },
                    ],
                },
            ];
            res.status(200).json(data);
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
