import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ChatWindow from '@/components/chat/ChatWindow';
import Button from '@/components/ui/Button';
import { getChatById, updateChat, deleteChat } from '@/lib/queries';
import { Chat } from '@/lib/schema';

interface ChatPageProps {
    chat: Chat;
}

export default function ChatPage({ chat: initialChat }: ChatPageProps) {
    const [chat, setChat] = useState(initialChat);
    const router = useRouter();

    const handleUpdateChat = async (messages: any[]) => {
        try {
            await updateChat(chat.id, chat.title, messages);
            setChat({ ...chat, messages });
        } catch (error) {
            console.error('Failed to update chat:', error);
        }
    };

    const handleDeleteChat = async () => {
        try {
            await deleteChat(chat.id);
            router.push('/');
        } catch (error) {
            console.error('Failed to delete chat:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{chat.title}</h1>
            <ChatWindow chat={chat} onUpdateChat={handleUpdateChat} />
            <div className="mt-4">
                <Button variant="danger" onClick={handleDeleteChat}>Delete Chat</Button>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const chatId = context.params?.id as string;
    const chat = await getChatById(chatId);

    if (!chat || chat.userId !== session.user.id) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            chat: JSON.parse(JSON.stringify(chat)),
        },
    };
};