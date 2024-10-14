import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ChatHistory from '@/components/chat/ChatHistory';
import Button from '@/components/ui/Button';
import { getChatsByUserId } from '@/lib/queries';
import { Chat } from '@/lib/schema';

interface HomeProps {
    chats: Chat[];
}

export default function Home({ chats }: HomeProps) {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome to AI Chat</h1>
                <p className="mb-4">Please sign in to start chatting.</p>
                <Link href="/login">
                    <Button>Sign In</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome, {session.user?.email}</h1>
            <Link href="/chat/new">
                <Button className="mb-6">Start New Chat</Button>
            </Link>
            <ChatHistory chats={chats} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            props: {
                chats: [],
            },
        };
    }

    const chats = await getChatsByUserId(session.user.id);

    return {
        props: {
            chats: JSON.parse(JSON.stringify(chats)),
        },
    };
};