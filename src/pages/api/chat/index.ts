import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getChatsByUserId, createChat } from "@/lib/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "GET") {
        try {
            const chats = await getChatsByUserId(session.user.id);
            return res.status(200).json(chats);
        } catch (error) {
            console.error("Get chats error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    if (req.method === "POST") {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const chat = await createChat(session.user.id, title, []);
            return res.status(201).json(chat);
        } catch (error) {
            console.error("Create chat error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    return res.status(405).json({ message: "Method not allowed" });
}