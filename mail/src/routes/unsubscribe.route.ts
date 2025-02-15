import { Router } from 'express';
import { unsubscribeUser } from '../services/unsubscribe.service';
import { validateUnsubscribe } from '../validations/unsubscribe.validation';

const router = Router();

router.post('/unsubscribe', validateUnsubscribe, async (req, res) => {
    const { email, reason } = req.body;

    try {
        const result = await unsubscribeUser(email, reason);
        res.status(200).json({ result });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export { router as unsubscribeRouter };
