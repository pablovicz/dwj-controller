import { Box, Button, CloseButton, Flex, HStack, Slide, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "../service/hooks/useCookies";


export function CookiesUseWarning() {

    const { getCookieData, updateCookieData } = useCookies();

    const allowCookies = getCookieData('allowCookieUse');

    const [isWarningOpen, setIsWarningOpen] = useState(!allowCookies);


    function handleUseCookiesSave(){
        updateCookieData('allowCookieUse', 60 * 60 * 24 * 30, true);
        setIsWarningOpen(false);
    }

    function handleDontUseCookiesClick(){
        updateCookieData('allowCookieUse', 60 * 60 * 24 * 30, false);
        setIsWarningOpen(false);
    }


    return (
        <Slide direction='bottom' in={isWarningOpen} style={{ zIndex: 10 }}>
            <Box
                p='30px'
                color='gray.900'
                mt='4'
                bg='yellow.500'
                rounded='md'
                shadow='md'
            >
                <Flex w="100%" h={30} align="center" justify="end">
                    <CloseButton
                        onClick={() => setIsWarningOpen(false)}
                    />
                </Flex>
                <Flex
                    flexDir="column"
                    w="60%"
                    h="90%"
                    align="center"
                    justify="start"
                >

                    <Box mb="8">
                        <Text fontWeight="extrabold" fontSize="24" textAlign="start" mb="4">
                            Cookies Policy
                        </Text>
                        <Text fontWeight="regular" fontSize="18">
                            We use cookies to improve your experience,
                            if you agree with this,
                            please confirm below.
                        </Text>
                    </Box>
                    <Flex flexDir="row" w="90%" align="center" justify="end">
                        <HStack spacing="4">
                            <Button
                                colorScheme="gray"
                                onClick={handleDontUseCookiesClick}
                            >
                                Dismiss
                            </Button>
                            <Button
                                colorScheme="yellow"
                                onClick={handleUseCookiesSave}
                            >
                                Confirm
                            </Button>
                        </HStack>
                    </Flex>
                </Flex>
            </Box>
        </Slide >
    );
}