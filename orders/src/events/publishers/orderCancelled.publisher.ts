import { OrderCancelledEvent, Publisher, Subjects } from '@badalcodeorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
