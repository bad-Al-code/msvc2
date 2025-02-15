import { Router, Request, Response } from 'express';
import { resubscribeUser } from '../services/resubscribe.service';
import { validateResubscribe } from '../validations/resubscribe.validation';

const router = Router();

router.post(
    '/resubscribe',
    validateResubscribe,
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const result = await resubscribeUser(email);
            res.status(200).json({ result });
        } catch (error) {
            res.status(400).json({ error: 'Failed to resubscribe' });
        }
    },
);

export { router as resubscribeRouter };
