'use client'

import { useState, useCallback } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Avatar from '@/app/_components/Avatar';
import LoadingModal from '@/app/_components/LoadingModal';


interface UserSelectProps {
    user: User
}

const UserSelect:React.FC<UserSelectProps> = ({ 
    user 
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', {
            userId: user.id
        })
        .then(data => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => {
           setIsLoading(false); 
        })
    }, [user.id, router]);

    return ( 
        <>  
            {isLoading && (
                <LoadingModal/>
            )}
            <div
                onClick={handleClick}
                className="
                    w-full
                    relative
                    flex
                    items-center
                    space-x-3
                    bg-white
                    p-3
                    hover:bg-neutral-100
                    rounded-lg
                    transition
                    cursor-pointer
                "
            >
                <Avatar user={user}/>

                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div
                            className="
                                flex
                                justify-between
                                items-center
                                mb-1
                            "
                        >
                            <p
                                className="
                                    text-md
                                    font-medium
                                    text-gray-900
                                "
                            >
                                {user?.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default UserSelect;