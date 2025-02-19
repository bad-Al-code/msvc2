import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket.model';
import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@badalcodeorg/common';

import { TicketUpdatedEvent } from '@badalcodeorg/common';
import { natsWrapper } from '../natsWrapper';
import { TicketUpdatedPublisher } from '../events/publishers/ticketUpdate.publisher';

const router = express.Router();

router.put(
    '/api/tickets/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be getear than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({ title: req.body.title, price: req.body.price });
        await ticket.save();

        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId,
            version: ticket.version,
        });

        res.send(ticket);
    },
);

export { router as updateTicketRouter };
