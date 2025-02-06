import mongoose, { Model, Schema } from 'mongoose';

import { Order, OrderStatus } from './order.model';

interface TicketAttrs {
    title: string;
    price: string;
}

export interface TicketDoc extends TicketAttrs {
    title: string;
    price: string;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema(
    {
        title: {
            type: String,
            requried: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete,
            ],
        },
    });

    return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
