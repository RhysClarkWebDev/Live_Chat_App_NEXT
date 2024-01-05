import { Conversation, Message, User } from '@prisma/client';



export type FullMessageType = Message & {
    senderUser: User,
    seen: User[]
};




export type FullConversationType = Conversation & {
    users: User[],
    messages: FullMessageType[],
}