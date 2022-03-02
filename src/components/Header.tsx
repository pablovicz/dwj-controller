import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FiRepeat, FiSliders } from "react-icons/fi";
import { TooltipBtnIcon } from "./TooltipBtnIcon";

interface HeaderProps {
    isWorkStarted: boolean;
    handleReset: () => void;
    handleParametersOpen: () => void;
}




export function Header({ isWorkStarted, handleReset, handleParametersOpen }: HeaderProps) {
    return (
        <Flex
            as="header"
            w="100vw"
            h={100}
            align="center"
            justify="center"
        >
            <Flex
                h="100%"
                w="100%"
                align="center"
                justify="space-between"
                p="4"
                flexDir="row"
            >
                <Box>
                    <TooltipBtnIcon
                        label="Run Again"
                        aria-label="rerun"
                        onClick={handleReset}
                        icon={<Icon as={FiRepeat} />}
                        colorScheme="whiteAlpha"
                        renderCondition={isWorkStarted}
                    />
                </Box>
                <TooltipBtnIcon
                    label="Parameters"
                    aria-label="parameters"
                    onClick={handleParametersOpen}
                    icon={<Icon as={FiSliders} />}
                />
            </Flex>
        </Flex>
    )
}