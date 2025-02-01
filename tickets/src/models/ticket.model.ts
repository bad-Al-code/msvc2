import { model, Schema } from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

const ticketShema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    },
);
const Ticket = model<TicketAttrs>('Ticket', ticketShema);
export { Ticket };
