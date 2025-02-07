import mongoose, { Model, Schema, Document } from 'mongoose';

import { Order, OrderStatus } from './order.model';

interface TicketAttrs {
    id: string;
    title: string;
    price: number;
}

export interface TicketDoc extends Document, TicketAttrs {
    id: string;
    title: string;
    price: number;
    isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
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
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    });
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
