import { Request, Response } from 'express';

export function carbonCredits(req: Request, res: Response) {
    res.status(200).send(`Carbon Credits!! 💰 `);
}
