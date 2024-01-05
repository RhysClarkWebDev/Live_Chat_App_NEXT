'use client'

import Modal from '@/app/_components/Modal';
import Image from 'next/image';


interface ImageModalProps {
    isOpen?: boolean;
    src?: string | null;
    onClose: () => void;
}


const ImageModal:React.FC<ImageModalProps> = ({
    isOpen,
    src,
    onClose
}) => {

    if(!src) {
        return null;
    }

    return ( 
        <Modal
            onClose={onClose}
            isOpen={isOpen}
        >
            <div className="w-80 h-80">
                <Image
                    alt="Image"
                    className="object-cover"
                    fill
                    src={src}
                />
            </div>
        </Modal>
     );
}
 
export default ImageModal;