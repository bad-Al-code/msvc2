import { z } from 'zod';

export const emailSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    name: z.string().min(1, { message: 'Name is required' }),
});

export const validateEmail = (req: any, res: any, next: any) => {
    try {
        emailSchema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.errors });
    }
};
