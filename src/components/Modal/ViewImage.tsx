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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="900px" p="0" m="0" w="auto" bgColor="pGray.800">
          
          <ModalBody p="0" m="0">
            <Image src={imgUrl}/>
          </ModalBody>
            

          <ModalFooter justifyContent="left" >
            <Link to="route" target="_blank" rel="noopener noreferrer" href={imgUrl} >Abrir original</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
