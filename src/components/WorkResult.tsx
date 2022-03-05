import { ScaleFade, Text, VStack } from "@chakra-ui/react";

interface WorkResultProps {
    result: string;
    renderCondition?: boolean;
}


export function WorkResult({ result, renderCondition = true }: WorkResultProps) {

    const color = result.includes('-') ? 'red' : 'green';

    return (
        <ScaleFade initialScale={0.9} in={renderCondition}>
            <VStack spacing="1" align="center">
                <Text fontSize="20" color={color} fontWeight="extrabold">Journey Result</Text>
                <Text fontSize="20" color={color} fontWeight="bold">{result}</Text>
            </VStack>
        </ScaleFade>
    )
}