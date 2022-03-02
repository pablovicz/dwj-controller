import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'


interface TooltipBtnIconProps extends IconButtonProps {
    label: string;
    tooltipStyles?: {
        bg: string;
        color: string;
    }
    renderCondition?: boolean;
}


export function TooltipBtnIcon({ label, tooltipStyles = { bg: 'yellow.400', color: 'gray.900' }, renderCondition = true, ...rest }: TooltipBtnIconProps) {

    if (renderCondition) {
        return (
            <Tooltip hasArrow label={label} bg={tooltipStyles.bg} color={tooltipStyles.color}>
                <IconButton
                    colorScheme="yellow"
                    size="sm"
                    {...rest}
                />
            </Tooltip>
        );
    } else {
        return (
            <></>
        );
    }
}