import React from 'react';
import { resend } from '../config/resend';
import { WelcomeEmail } from '../emails/WelcomeEmail';
import { render } from '@react-email/render';
import { isUserUnsubscribed } from './unsubscribe.service';

interface SendEmailParams {
    to: string;
    name: string;
}

export const sendWelcomeEmail = async ({ to, name }: SendEmailParams) => {
    if (await isUserUnsubscribed(to)) {
        console.log(`Skipping email to ${to}, user is unsubscribed.`);
        return { success: false, message: 'User is unsubscribed' };
    }

    const emailHtml = await render(<WelcomeEmail name={name} />);

    try {
        const response = await resend.emails.send({
            from: process.env.RESEND_DOMAIN_NAME as string,
            to,
            subject: 'Welcome to Our Service!',
            html: emailHtml,
        });

        console.log('Email sent:', response);
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
