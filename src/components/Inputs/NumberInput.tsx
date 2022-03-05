import {
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

interface NumberInputProps {
    name: string;
    label?: string;
    step?: number;
    min?: number;
    max: number;
    value: number;
    onChange: (val: number) => void;
    isDisabled?: boolean;
    color: string;
}



export function NumberInput({ name, label, step = 1, min = 0, max, value, onChange, isDisabled = false, color = "gray.100" }: NumberInputProps) {
    return (

        <FormControl>
            {
                !!label && (<FormLabel htmlFor={name} mb="2" color={color}>{label}</FormLabel>)
            }
            <ChakraNumberInput
                value={value}
                onChange={(val) => onChange(Number(val))}
                step={step}
                min={min}
                max={max}
                isDisabled={isDisabled}
                variant="flushed"
                borderBottomColor={color}
            >
                <NumberInputField textAlign="center" color={color}/>
                <NumberInputStepper>
                    <NumberIncrementStepper border="none" _hover={{ color: color }} _focus={{ color: color }} />
                    <NumberDecrementStepper border="none" _hover={{ color: color }} _focus={{ color: color }} />
                </NumberInputStepper>
            </ChakraNumberInput>
        </FormControl>

    );
}