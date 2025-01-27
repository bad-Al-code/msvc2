import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.middleware';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password must be provided'),
    ],
    validateRequest,
    (req: Request, res: Response) => {
        const { email, password } = req.body;

        res.send({});
    },
);

export { router as siginRouter };
