import React from 'react';
import { eq } from 'drizzle-orm';
import { render } from '@react-email/render';

import { resend } from '../config/resend';
import { WelcomeEmail } from '../emails/WelcomeEmail';
import { isUserUnsubscribed } from './unsubscribe.service';
import { db } from '../config/db';
import { users } from '../db/schema';

interface SendEmailParams {
    to: string;
    name: string;
}

export const sendWelcomeEmail = async ({ to, name }: SendEmailParams) => {
    if (await isUserUnsubscribed(to)) {
        console.log(`Skipping email to ${to}, user is unsubscribed.`);
        return { success: false, message: 'User is unsubscribed' };
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, to));

    if (existingUser.length === 0) {
        await db.insert(users).values({ email: to, name });
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
