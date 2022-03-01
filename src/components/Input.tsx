import { forwardRef, ForwardRefRenderFunction } from 'react';
//import { FieldError } from 'react-hook-form';
import {
    Input as ChakraInput, FormLabel, FormControl,
    InputProps as ChrakraInputProps, FormErrorMessage
} from '@chakra-ui/react';

interface InputProps extends ChrakraInputProps {
    name: string;
    label?: string;
    error?: {message: string};
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {
                !!label && (<FormLabel htmlFor={name}>{label}</FormLabel>)  //só mostra caso o label exista}  
            }
            < ChakraInput
                name={name}
                id={name}
                focusBorderColor="yellow.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: 'gray.900'
                }}
                size="lg"
                ref={ref}
                {...rest}
            />
            {!!error && (
                <FormErrorMessage>{error.message}</FormErrorMessage>
            )}
        </FormControl>
    )
}


export const Input = forwardRef(InputBase);