import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@badalcodeorg/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Types } from 'mongoose';

import { Order } from '../models/order.model';

const router = express.Router();

router.get(
    '/api/orders/:orderId',
    requireAuth,
    [
        body('orderId')
            .not()
            .isEmpty()
            .custom((input: string) => Types.ObjectId.isValid)
            .withMessage('Order Id mustbe valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id).populate('ticket');

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId === req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        res.send(order);
    },
);

export { router as showOrderRouter };
