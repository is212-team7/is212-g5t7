import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<number[] | { error: string }>
) {
    const BASE_URL = process.env.API_URL + '/staffs/participating/ids';

    switch (req.method) {
        case 'GET':
            fetch(BASE_URL)
                .then((response) => response.json())
                .then((result: number[]) => {
                    res.status(200).json(result);
                })
                .catch((error) => console.log('error', error));
            break;

        default:
            res.status(400).json({ error: 'Invalid API endpoint.' });
            break;
    }
}
