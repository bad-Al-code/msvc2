import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { users, emailPreferences, emailLogs } from '../db/schema';

export const resubscribeUser = async (email: string) => {
    const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    if (!existingUser) {
        return { success: false, message: 'User does not exists' };
    }

    const userId = existingUser.id;

    const [preference] = await db
        .select()
        .from(emailPreferences)
        .where(eq(emailPreferences.userId, userId))
        .limit(1);
    if (!preference || !preference.unsubscribe) {
        return { success: false, message: 'User is already subscribed' };
    }

    await db
        .update(emailPreferences)
        .set({ unsubscribe: false })
        .where(eq(emailPreferences.userId, userId));

    await db.insert(emailLogs).values({
        userId,
        type: 'resubscribe',
        status: 'success',
        response: JSON.stringify({ message: 'User resubscribed successfully' }),
    });

    return { success: true, message: 'User resubscribed successfully' };
};
