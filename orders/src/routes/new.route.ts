import { Request, Response, Router } from 'express';
import {
    BadRequestError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@badalcodeorg/common';
import { body, ExpressValidator } from 'express-validator';
import { Types } from 'mongoose';

import { Ticket } from '../models/ticket.model';
import { Order } from '../models/order.model';

const router = Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => Types.ObjectId.isValid(input))
            .withMessage('TicketId must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        /**
         * TODO:
         * 1. Find the ticket the user is trying to order in the database
         * 2. Ticket is not already reserved
         * 3. Calculate expiration date or this order
         * 4. Build the order and save to the database
         * 5. Publish event, order:created
         */

        const { ticketId } = req.body;

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        const isReserved = await ticket.isReserved();

        if (isReserved) {
            throw new BadRequestError('Ticket is already reserved');
        }

        const expiration = new Date();
        expiration.setSeconds(
            expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS,
        );

        const order = Order.build({
            userId: req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticket,
        });

        await order.save();

        res.status(201).send({ order });
    },
);

export { router as newOrderRouter };
