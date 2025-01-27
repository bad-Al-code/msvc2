import express, { Request, Response } from 'express';
import { validationResult, body, Result } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError } from '../errors/requestValidation.error';
import { BadRequestError } from '../errors/badRequest.error';
import { User } from '../models/user.model';

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
    async (req: Request, res: Response) => {
        const errors: Result = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = new User({ email, password });
        await user.save();

        const userJwt = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY!,
        );

        req.session = { jwt: userJwt };

        res.status(201).send(user);
    },
);

export { router as signupRouter };
