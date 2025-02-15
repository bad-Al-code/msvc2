import { eq } from 'drizzle-orm';
import { db } from '../config/db';
import { users, unsubscribedUsers } from '../db/schema';

export const resubscribeUser = async (email: string) => {
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    if (existingUser.length === 0) {
        return { success: false, message: 'User does not exist' };
    }

    const isUnsubscribed = await db
        .select()
        .from(unsubscribedUsers)
        .where(eq(unsubscribedUsers.email, email));
    if (isUnsubscribed.length === 0) {
        return { success: false, message: 'User is not unsubscribed' };
    }

    await db
        .delete(unsubscribedUsers)
        .where(eq(unsubscribedUsers.email, email));

    return { success: true, message: 'User resubscribed successfully' };
};
