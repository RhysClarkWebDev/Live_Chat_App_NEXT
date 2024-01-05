import prisma from '@/app/_libs/prismadb';


const getMessages = async(
    conversationId: string
) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                senderUser: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });


        return messages;
    } catch (error) {
        return [];
    }
}



export default getMessages;