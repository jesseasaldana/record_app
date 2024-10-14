import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, chats, User, Chat } from "./schema";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function getUser(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
}

export async function createUser(email: string, password: string): Promise<void> {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    await db.insert(users).values({ email, password: hash });
}

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
    return db.select().from(chats).where(eq(chats.userId, userId));
}

export async function getChatById(id: string): Promise<Chat | undefined> {
    const [chat] = await db.select().from(chats).where(eq(chats.id, id));
    return chat;
}

export async function createChat(userId: string, title: string, messages: any[]): Promise<Chat> {
    const [chat] = await db.insert(chats).values({ userId, title, messages }).returning();
    return chat;
}

export async function updateChat(id: string, title: string, messages: any[]): Promise<void> {
    await db.update(chats).set({ title, messages }).where(eq(chats.id, id));
}

export async function deleteChat(id: string): Promise<void> {
    await db.delete(chats).where(eq(chats.id, id));
}