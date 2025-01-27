import express, { Request, Response } from 'express';
import { validationResult, body, Result } from 'express-validator';
import { RequestValidationError } from '../errors/requestValidation.error';
import { User } from '../models/user.model';
import { BadRequestError } from '../errors/badRequest.error';

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

        // TODO: hash the password
        const user = new User({ email, password });
        await user.save();

        res.status(201).send(user);
    },
);

export { router as signupRouter };
