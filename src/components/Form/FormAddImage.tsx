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
      required: "Arquivo obrigatório",
      validate: {
        lessThan10MB: size => size < 10,
        acceptedFormats: type => type === "image/jpeg" || " image/png" || "image/gif",
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
    {
      // TODO ONSUCCESS MUTATION
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
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
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
          // TODO SEND IMAGE ERRORS
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
          {...register("FileInput", formValidations.image)}
        />
        {errors.FileInput && <span role="alert">{errors.FileInput.message}</span>}
        

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          
          error = {
            errors.TextInput?.type === 'required' && {type: "required", message: "Título obrigatório"} ||
            errors.TextInput?.type === "minLength" && {type: "minLength", message: "Mínimo de 2 caracteres"} ||
            errors.TextInput?.type === "maxLength" && {type: "maxLength", message: "Máximo de 20 caracteres"}
          }
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register("TextInput", formValidations.title)}
         
        />
        

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          error = {
            errors.TextInput?.type === 'required' && {type: "required", message: "Descrição obrigatória"} ||
            errors.TextInput?.type === 'maxLength' && {type: "maxLength", message: "Máximo de 65 caracteres"}
          }
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register("TextInput", formValidations.description)}
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
