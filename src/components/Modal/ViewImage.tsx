import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent alignItems="center" w="0">
          
          
            <Image src={imgUrl} maxW="900px" maxH="600px"/>
          

          <ModalFooter>
            <Link>Abrir Original</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
