import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import { pusherServer } from '@/app/_libs/pusher';


interface IParams {
    conversationId?: string;
}



export async function DELETE(
    request: Request,
    { params }: {params: IParams}
) {
    try {
        const { conversationId } = params;

        const currentUser = await getCurrentUser();

        if(!currentUser?.id) {
            return new NextResponse('Unauthorised', { status: 401 })
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if(!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }



        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        existingConversation.users.forEach(user => {
            if(user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
        });
        
        return NextResponse.json(deletedConversation);

    } catch (error: unknown) {
        console.log('CONVERSATION_DELETE_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}