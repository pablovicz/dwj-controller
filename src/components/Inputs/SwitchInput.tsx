import { FormControl, FormLabel, Switch, SwitchProps } from "@chakra-ui/react";

interface SwitchInputProps extends SwitchProps {
    name: string;
    label?: string;
    labelPosition?: "left" | "top";

}


export function SwitchInput({ name, label, labelPosition, ...rest }: SwitchInputProps) {
    return (
        <FormControl
            display='flex'
            alignItems='center'
            flexDir={labelPosition === 'left' ? 'row' : 'column'}
            justifyContent="center"
        >
            <FormLabel htmlFor={name} mb="0" >
                {label}
            </FormLabel>
            <Switch
                id={name}
                p="4"
                {...rest}
            />
        </FormControl>
    )
}