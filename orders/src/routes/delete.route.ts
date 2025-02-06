import express, { Request, Response } from 'express';
import {
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@badalcodeorg/common';
import { param } from 'express-validator';

import { Order } from '../models/order.model';
import { Types } from 'mongoose';

const router = express.Router();

router.delete(
    '/api/orders/:orderId',
    [
        param('orderId')
            .notEmpty()
            .withMessage('Order ID is required')
            .custom((input: string) => Types.ObjectId.isValid(input))
            .withMessage('Invalid order Id'),
    ],
    validateRequest,
    requireAuth,
    async (req: Request, res: Response) => {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        order.status = OrderStatus.Cancelled;

        await order.save();

        res.status(204).send(order);
    },
);

export { router as deleteOrderRouter };
