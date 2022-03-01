import {
    FormControl,
    FormLabel,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NumberInput } from './NumberInput';

interface HourMinute {
    hour: number;
    minute: number;
}


interface HourMinuteInputProps {
    name: string;
    label: string;
    value: HourMinute;
    parentCallback: (val: HourMinute) => void;
    isDisabled?: boolean;
}





export function HourMinuteInput({ name, value, parentCallback, label, isDisabled = false }: HourMinuteInputProps) {

    const [hours, setHours] = useState(value.hour);
    const [minute, setMinute] = useState(value.minute);
    const [color, setColor] = useState("gray.100");

    useEffect(() => {
        parentCallback({ hour: hours, minute: minute })
    }, [hours, minute])


    return (
        <FormControl 
            onMouseEnter={() => setColor("yellow.400")}
            onMouseLeave={() => setColor("gray.100")}
        >
            <VStack spacing="2">
                {
                    !!label && (<FormLabel htmlFor={name} color={color}>{label}</FormLabel>)
                }
                <HStack w={200}>
                    <NumberInput
                        name={`${name}Hour`}
                        value={hours}
                        onChange={setHours}
                        min={0}
                        max={23}
                        isDisabled={isDisabled}
                        color={color}
                    />
                    <Text fontSize="22" fontWeight="bold">:</Text>
                    <NumberInput
                        name={`${name}Minute`}
                        value={minute}
                        onChange={setMinute}
                        min={0}
                        max={59}
                        step={5}
                        isDisabled={isDisabled}
                        color={color}
                    />
                </HStack>
            </VStack>
        </FormControl>

    );
}