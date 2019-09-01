import { Request, Response } from 'express';
import { generateRandomMockObject } from '../helpers/generate-random-mock-object';

export function detailsPage(req: Request, res: Response) {
    const detailsId = req.params.id;
    const someRandomData = generateRandomMockObject();
    res.json({ id: detailsId, ...someRandomData });
}
