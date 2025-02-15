import React from 'react';
import { eq } from 'drizzle-orm';
import { render } from '@react-email/render';

import { resend } from '../config/resend';
import { WelcomeEmail } from '../emails/WelcomeEmail';
import { db } from '../config/db';
import { emailLogs, emailPreferences, users } from '../db/schema';

interface SendEmailParams {
    to: string;
    name: string;
    type: 'welcome' | 'notification';
}

export const sendWelcomeEmail = async ({ to, name, type }: SendEmailParams) => {
    const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, to))
        .limit(1);

    let userId: number;
    if (!existingUser) {
        const insertedUser = await db
            .insert(users)
            .values({ email: to, name })
            .$returningId();
        userId = insertedUser[0].id;
    } else {
        userId = existingUser.id;
    }

    const [preference] = await db
        .select()
        .from(emailPreferences)
        .where(eq(emailPreferences.userId, userId))
        .limit(1);
    if (preference?.unsubscribe) {
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

        await db.insert(emailLogs).values({
            userId,
            type,
            status: 'success',
            response: JSON.stringify(response),
        });

        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        await db.insert(emailLogs).values({
            userId,
            type,
            status: 'failed',
            response: JSON.stringify(error),
        });
        throw error;
    }
};
