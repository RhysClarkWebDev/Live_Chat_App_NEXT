import getUsers from '@/app/_actions/getusers'
import Sidebar from '@/app/_components/Sidebar/Sidebar'
import UserList from './_components/UserList';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Users | MessageMe',
    description: ''
}


export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {

    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <UserList users={users}/>
                {children}
            </div>
        </Sidebar>
    )
}