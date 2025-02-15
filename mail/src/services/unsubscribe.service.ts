import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import {
    emailLogs,
    emailPreferences,
    users,
    unsubscribedHistory,
} from '../db/schema';

export const unsubscribeUser = async (email: string, reason?: string) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    if (!user) {
        throw new Error('User not found');
    }

    const userId = user.id;

    const [preferences] = await db
        .select()
        .from(emailPreferences)
        .where(eq(emailPreferences.userId, userId))
        .limit(1);
    if (preferences?.unsubscribe) {
        throw new Error('User is already unsubscribed');
    }

    await db
        .update(emailPreferences)
        .set({ unsubscribe: true })
        .where(eq(emailPreferences.userId, userId));

    await db.insert(unsubscribedHistory).values({
        userId,
        email,
        reason: reason || 'No reason provided',
    });

    await db.insert(emailLogs).values({
        userId,
        type: 'unsubscribe',
        status: 'success',
        response: JSON.stringify({ message: 'User unsubscribed successfully' }),
    });

    return { message: 'User unsubscribed successfully' };
};
