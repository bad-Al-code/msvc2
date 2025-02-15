import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate.middleware';
import { resubscribeUser } from '../services/resubscribe.service';
import { resubscribeSchema } from '../validations/resubscribe.validation';

const router = Router();

router.post(
    '/resubscribe',
    validate(resubscribeSchema),
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const result = await resubscribeUser(email);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: 'Failed to resubscribe' });
        }
    },
);

export { router as resubscribeRouter };
