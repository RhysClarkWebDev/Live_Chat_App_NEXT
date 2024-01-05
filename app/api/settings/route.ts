import getCurrentUser from '@/app/_actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            name,
            image
        } = body;

        if(!currentUser?.id) {
            return new NextResponse('Unauthorised', { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name
            }
        })


        return NextResponse.json(updatedUser);

    } catch(error: unknown) {
        console.log('SETTINGS_ERROR', error);
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}