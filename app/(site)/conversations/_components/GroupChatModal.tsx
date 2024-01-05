'use client'

import Button from '@/app/_components/Buttons/Button';
import Select from '@/app/_components/Inputs/Select';
import Input from '@/app/_components/Inputs/input';
import Modal from '@/app/_components/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';



interface GroupChatModalProps {
    users: User[];
    isOpen: boolean;
    onClose: () => void;
}

const GroupChatModal:React.FC<GroupChatModalProps> = ({
    users,
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });


    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);


        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch((error) => {
            console.log(error);
            toast.error('Something went wrong!');
        })
        .finally(() => setIsLoading(false))
    }

    return ( 
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2
                            className="
                                text-base
                                font-semibold
                                leading-7
                                text-gray-900
                            "
                        >
                            Create a group chat
                        </h2>
                        <p
                            className="
                                mt-1
                                text-sm
                                leading-6
                                text-gray-600
                            "
                        >
                            Create a chat with more than 2 people.
                        </p>

                        <div 
                            className="
                                mt-10
                                flex
                                flex-col
                                gap-y-8
                            "
                        >
                            <Input 
                                label={'Name'} 
                                id={'name'} 
                                register={register} 
                                errors={errors}
                                disabled={isLoading}
                                required
                            />

                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-end
                        gap-x-6
                    "
                >
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
     );
}
 
export default GroupChatModal;