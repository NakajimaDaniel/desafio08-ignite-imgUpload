import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: true,
      validate: {
        //10485760  actual 101757
        lessThan10MB: (file) => parseInt(file[0].size) < 10485760, //<10 false = error   >10 true
        acceptedFormats: file => file[0].type == "image/jpeg" || file[0].type == "image/png" || file[0].type == "image/gif", // image/jpeg, image/png ou image/gif
      }


    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: true,
      minLength: 2,
      maxLength: 20,

    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: true,
      maxLength: 65,
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    (data)=> api.post('api/images'),
    {
      // TODO ONSUCCESS MUTATION
      onSuccess: () => {
        queryClient.invalidateQueries('images')
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      if(!imageUrl) {
        toast({
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
        })
      }
      // TODO EXECUTE ASYNC MUTATION
      const todo = await mutation.mutateAsync()
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: "Falha no cadastro",
        description: "Ocorreu um erro ao tentar cadastrar a sua imagem.",
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="file"
          // TODO SEND IMAGE ERRORS
          error = {
            errors.file?.type === 'required' && {type: 'required', message: "Arquivo obrigatório"} ||
            errors.file?.type === "lessThan10MB" && {type: "lessThan10MB", message: "O arquivo deve ser menor que 10MB"} ||
            errors.file?.type === "acceptedFormats" && {type: "acceptedFormats", message: "Somente são aceitos arquivos PNG, JPEG e GIF"}
          }
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register("file", formValidations.image)}
        />
        
        

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          name = "titleInput"
          error = {
            errors.titleInput?.type === "required" && {type: "required", message: "Título obrigatório"} ||
            errors.titleInput?.type === "minLength" && {type: "minLength", message: "Mínimo de 2 caracteres"} ||
            errors.titleInput?.type === "maxLength" && {type: "maxLength", message: "Máximo de 20 caracteres"}
          }
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register("titleInput", formValidations.title)}

        />


        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          name="descriptionInput"
          error = {
            errors.descriptionInput?.type === 'required' && {type: "required", message: "Descrição obrigatória"} ||
            errors.descriptionInput?.type === 'maxLength' && {type: "maxLength", message: "Máximo de 65 caracteres"}
          }
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register("descriptionInput", formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
