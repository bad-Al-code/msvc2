import { Request, Response, Router } from 'express';

import { sendWelcomeEmail } from '../services/email.service';
import { validateEmail } from '../validations/email.validation';

const router = Router();

router.post(
    '/send-welcome',
    validateEmail,
    async (req: Request, res: Response) => {
        try {
            const { email, name } = req.body;
            const result = await sendWelcomeEmail({
                to: email,
                name,
                type: 'welcome',
            });

            res.status(200).json({ result });
        } catch (error) {
            res.status(400).json({ error: 'Failed to send email' });
        }
    },
);

export { router as mailRouter };
