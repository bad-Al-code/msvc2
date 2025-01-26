import express, { Request, Response } from 'express';
import { validationResult, body, Result } from 'express-validator';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be a valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 character'),
    ],
    (req: Request, res: Response) => {
        const errors: Result = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
            return;
        }

        const { email, password } = req.body;

        console.log('Creating a user');

        res.send({});
    },
);

export { router as signupRouter };
