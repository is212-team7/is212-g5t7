import type { NextApiRequest, NextApiResponse } from 'next';
import { Staff, StaffAPI } from '../';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Staff | { error: string }>
) {
    const { staffId } = req.query;
    const BASE_URL = process.env.API_URL + '/staffs/' + staffId;

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: StaffAPI) => {
                    res.status(200).json({
                        id: result.Staff_ID,
                        fName: result.Staff_FName,
                        lName: result.Staff_LName,
                        dept: result.Dept,
                        email: result.Email,
                        systemRole: result.System_Role,
                    });
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
