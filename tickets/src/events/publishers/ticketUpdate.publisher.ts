import { Publisher, Subjects, TicketUpdatedEvent } from '@badalcodeorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
