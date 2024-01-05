'use client'

import clsx from 'clsx';

import useConversation from '@/app/_hooks/useConversation';
import EmptyState from '@/app/_components/EmptyState';


const Conversations = () => {
    const { isOpen } = useConversation();


    return ( 
        <div
            className={clsx(
                'lg:pl-80 h-full lg:block',
                isOpen ? 'block' : 'hidden'
            )}
        >
            <EmptyState/>
        </div>
     );
}
 
export default Conversations;