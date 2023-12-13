import Sidebar from '@/app/_components/Sidebar/sidebar'

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}