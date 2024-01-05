import Sidebar from '@/app/_components/Sidebar/Sidebar'
import ConversationList from './_components/ConversationList'
import getConversations from '@/app/_actions/getConversations'
import { Metadata } from 'next'
import getUsers from '@/app/_actions/getusers'



export const metadata: Metadata = {
    title: 'Conversations | MessageMe',
    description: ''
}


export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {

    const conversations = await getConversations();
    const users = await getUsers();
    
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}