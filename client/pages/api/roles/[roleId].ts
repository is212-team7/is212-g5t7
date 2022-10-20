import type { NextApiRequest, NextApiResponse } from 'next';
import { Role, RoleAPI } from '.';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Role | string | { error: string }>
) {
    const { roleId } = req.query;
    const BASE_URL = process.env.API_URL + '/roles/' + roleId;

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: RoleAPI) => {
                    const parsed: Role = {
                        id: result.Role_ID,
                        name: result.Role_Name,
                        deleted: result.Role_Deleted,
                        description: result.Role_Description,
                    };
                    res.status(200).json(parsed);
                })
                .catch((error) => console.log('error', error));
            break;

        case 'PUT':
            const roleToUpdate = JSON.parse(req.body) as Role;
            const body = JSON.stringify({
                Role_Name: roleToUpdate.name,
                Role_Description: roleToUpdate.description,
            });

            fetch(BASE_URL, {
                method: 'PUT',
                body,
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => response.json())
                .then((result: RoleAPI) => {
                    res.status(200).json(
                        `Role (${roleToUpdate.name}, ID: ${result.Role_ID}) is updated.`
                    );
                })
                .catch((error) => console.log('error', error));
            break;

        case 'DELETE':
            fetch(BASE_URL, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then(() => {
                    res.status(200).json(`Role ID of ${roleId} is deleted.`);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
