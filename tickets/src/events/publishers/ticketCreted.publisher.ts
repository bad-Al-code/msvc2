import { Publisher, Subjects, TicketCreatedEvent } from '@badalcodeorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
