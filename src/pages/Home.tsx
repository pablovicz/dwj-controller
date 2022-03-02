import {
    Flex, Button, VStack, Text, ScaleFade, useDisclosure, Icon, IconButton, Box, useBreakpointValue
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { FiSliders, FiRepeat } from 'react-icons/fi';
import { Header } from '../components/Header';
import { HourMinuteInput } from '../components/HourMinuteInput';
import { Logo } from '../components/Logo';
import { ParametersModal } from '../components/Modal/ParametersModal';
import { TooltipBtnIcon } from '../components/TooltipBtnIcon';
import { ParametersContext } from '../service/contexts/ParametersContext';
import { formatEndDate, getEndDate } from '../utils/dateUtils';

export function Home() {

    const { preferencesData } = useContext(ParametersContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isWorkStarted, setIsWorkStarted] = useState(false);
    const [startTimeInput, setStartTimeInput] = useState({ hour: 8, minute: 30 });
    const [endTime, setEndTime] = useState('');

    const [workJourney, setWorkJourney] = useState(preferencesData.workJourney);
    const [breakTime, setBreakTime] = useState(preferencesData.breakTime);
    const [extraTime, setExtraTime] = useState(preferencesData.extraTime);


    function handleWorkStart() {
        handleEndTimeSuggestion();
        setIsWorkStarted(true);
    }

    function handleReset() {
        onClose();
        setIsWorkStarted(false);
        //setStartTime('');
    }

    function handleEndTimeSuggestion() {
        const endTimeDate = getEndDate(startTimeInput, workJourney, breakTime, extraTime);
        const endDate = formatEndDate(endTimeDate);
        setEndTime(endDate);
    }




    useEffect(() => {
        setWorkJourney(preferencesData.workJourney);
        setExtraTime(preferencesData.extraTime);
        setBreakTime(preferencesData.breakTime);
        handleEndTimeSuggestion();

    }, [preferencesData, handleEndTimeSuggestion])

    const isWideVersion = useBreakpointValue({
        base: false,
        md: true,
        lg: true
    })

    return (
        <Flex 
        flexDir="column" 
        w="100vw" 
        h="100vh" 
        align="center" 
        justify={isWideVersion ? "center" : "space-between"}
        overflowX="hidden" 
        >
            {!isWideVersion && (
                <Header
                    isWorkStarted={isWorkStarted}
                    handleReset={handleReset}
                    handleParametersOpen={onOpen}
                />
            )}
            <VStack 
            spacing="20" 
            w="60vw" 
            align="center" 
            maxWidth={800}
            mb={isWideVersion ? "2" : "20"}
            >
                {isWideVersion ? (
                    <Flex flexDir="row" justify="space-evenly" align="center" w="100%" >
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
                        <Logo />
                        <TooltipBtnIcon
                            label="Parameters"
                            aria-label="parameters"
                            onClick={onOpen}
                            icon={<Icon as={FiSliders} />}
                        />
                    </Flex>
                ) : (
                    <Logo />
                )}
                {!isWorkStarted && (
                    <>
                        <HourMinuteInput
                            label="Work Start Time"
                            name="workStartTime"
                            value={startTimeInput}
                            parentCallback={setStartTimeInput}
                            isDisabled={isWorkStarted}
                        />

                        <Flex mt="8">

                            <Button
                                colorScheme="yellow"
                                onClick={handleWorkStart}
                            >
                                Start Work
                            </Button>
                        </Flex>
                    </>
                )}

                {isWorkStarted && (
                    <ScaleFade initialScale={0.9} in={isWorkStarted}>
                        <VStack spacing="4" align="center">
                            <Text fontSize="100" fontWeight="bold" color="yellow.400">{endTime}</Text>
                            {preferencesData.extraTime > 0 && (
                                <VStack spacing="1" align="center">
                                    <Text fontSize="16" color="gray.100" fontWeight="bold">Extra Time</Text>
                                    <Text fontSize="16" color="gray.100">{`+ ${preferencesData.extraTime} min`}</Text>
                                </VStack>
                            )}
                        </VStack>
                    </ScaleFade>
                )}
            </VStack>

            <ParametersModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}