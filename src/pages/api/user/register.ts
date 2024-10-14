import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser } from "@/lib/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await getUser(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await createUser(email, password);
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}