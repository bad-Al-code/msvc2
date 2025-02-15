import {
    boolean,
    mysqlTable,
    timestamp,
    varchar,
    serial,
    int,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emailPreferences = mysqlTable('email_preferences', {
    userId: int('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' })
        .primaryKey(),
    unsubscribe: boolean('unsubscribed').default(false),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const unsubscribedHistory = mysqlTable('unsubscribed_history', {
    id: serial().primaryKey(),
    userId: int('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }).notNull(),
    reason: varchar('reason', { length: 500 }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emailLogs = mysqlTable('email_logs', {
    id: serial().primaryKey(),
    userId: int('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 50 }).notNull(),
    status: varchar('status', { length: 50 }).notNull(),
    response: varchar('response', { length: 500 }),
    createdAt: timestamp('created_at').defaultNow(),
});
