import { NextFunction, Request, Response } from 'express';

export async function validateCustomToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const header = req.headers.authorization as string;
        if (!header || header == null) {
            return res.status(401)
                .send(`No custom token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Custom_Token>`);
        }
        const customToken = (header || '').split('Bearer ')[1];
        if (customToken !== process.env.CUSTOM_TOKEN) {
            return res.status(401).send(`Invaliad token`);
        }
        next();
    } catch (err) {
        res.status(500).send(
            `validateCustomToken failed unexpected with: ${err.message}`
        );
    }
}
