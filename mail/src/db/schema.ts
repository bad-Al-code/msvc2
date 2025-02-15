import {
    boolean,
    mysqlTable,
    timestamp,
    varchar,
    serial,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
    id: serial().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emailPreferences = mysqlTable('email_preferences', {
    userId: serial().primaryKey(),
    unsubscribe: boolean('unsubscribed').default(false),
});

export const unsubscribedUsers = mysqlTable('unsubscribed_users', {
    id: serial().primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});
