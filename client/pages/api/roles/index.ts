import type { NextApiRequest, NextApiResponse } from 'next';

export type RoleAPI = {
    Role_ID: string;
    Role_Name: string;
    Role_Description: string;
    Role_Deleted?: boolean;
};

export type Role = {
    id: string;
    name: string;
    description: string;
    deleted?: boolean;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Role[] | RoleAPI | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/roles/';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: RoleAPI[]) => {
                    const parsed: Role[] = result.map((row: RoleAPI) => {
                        return {
                            id: row.Role_ID,
                            name: row.Role_Name,
                            description: row.Role_Description,
                            deleted: row.Role_Deleted,
                        };
                    });
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        case 'POST':
            const roleToCreate = req.body as Role;
            const body = JSON.stringify({
                Role_Name: roleToCreate.name,
                Role_Description: roleToCreate.description,
            });

            fetch(BASE_URL, {
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: RoleAPI) => {
                    res.status(200).json(result);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
