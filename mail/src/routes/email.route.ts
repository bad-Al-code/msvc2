import { Request, Response, Router } from 'express';

import { sendWelcomeEmail } from '../services/email.service';
import { validate } from '../middleware/validate.middleware';
import { sendWelcomeEmailSchema } from '../validations/email.validation';

const router = Router();

router.post(
    '/send-welcome',
    validate(sendWelcomeEmailSchema),
    async (req: Request, res: Response) => {
        try {
            const { email, name } = req.body;
            const result = await sendWelcomeEmail({ to: email, name });

            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email' });
        }
    },
);

export { router as mailRouter };
