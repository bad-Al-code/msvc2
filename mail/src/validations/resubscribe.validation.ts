import { z } from 'zod';

export const resubscribeSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
});

export const validateResubscribe = (req: any, res: any, next: any) => {
    try {
        resubscribeSchema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.errors });
    }
};
