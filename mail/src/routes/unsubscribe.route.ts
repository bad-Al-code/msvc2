import { Request, Response, Router } from 'express';

import { validate } from '../middleware/validate.middleware';
import { unsubscribeSchema } from '../validations/unsubscribe.validation';
import { unsubscribedUser } from '../services/unsubscribe.service';

const router = Router();

router.post(
    '/unsubscribe',
    validate(unsubscribeSchema),
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const result = await unsubscribedUser(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: 'Failed to unsubscribe' });
        }
    },
);

export { router as unsubscribeRouter };
