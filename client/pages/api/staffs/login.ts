import type { NextApiRequest, NextApiResponse } from 'next';
import { Staff, StaffAPI } from '.';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Staff | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/staffs/login';

    switch (req.method) {
        case 'POST':
            const staff = req.body as Staff;
            const body = JSON.stringify({
                Email: staff.email,
            });

            fetch(BASE_URL, {
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/json' },
            })
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
