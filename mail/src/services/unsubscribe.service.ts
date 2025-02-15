import { eq } from 'drizzle-orm';

import { db } from '../config/db';
import { unsubscribedUsers } from '../db/schema';

export const unsubscribedUser = async (email: string) => {
    await db
        .insert(unsubscribedUsers)
        .values({ email })
        .onDuplicateKeyUpdate({ set: { email } });

    return { success: true, message: 'User unsubscribed successfully' };
};

export const isUserUnsubscribed = async (email: string): Promise<boolean> => {
    const result = await db
        .select()
        .from(unsubscribedUsers)
        .where(eq(unsubscribedUsers.email, email));

    return result.length > 0;
};
