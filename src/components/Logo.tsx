import { Text, VStack } from "@chakra-ui/react";


export function Logo() {
    return (
        <VStack spacing="2">
            <Text
                fontSize="24"
                fontWeight="extrabold"
                textAlign="center"
            >
                Work Journey
            </Text>
            <Text
                fontSize="24"
                fontWeight="extrabold"
                color="yellow.500"
                textAlign="center"
            >
                Controller
            </Text>
        </VStack>
    )
}