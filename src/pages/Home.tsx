import {
    Flex, Button, VStack, Text, ScaleFade, useDisclosure, Icon, IconButton, Box, useBreakpointValue, HStack
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { FiSliders, FiRepeat } from 'react-icons/fi';
import { CookiesUseWarning } from '../components/CookiesUseWarning';
import { Header } from '../components/Header';
import { HourMinuteInput } from '../components/Inputs/HourMinuteInput';
import { SwitchInput } from '../components/Inputs/SwitchInput';
import { Logo } from '../components/Logo';
import { ParametersModal } from '../components/Modal/ParametersModal';
import { TooltipBtnIcon } from '../components/TooltipBtnIcon';
import { WorkResult } from '../components/WorkResult';
import { ParametersContext } from '../service/contexts/ParametersContext';
import { useCookies } from '../service/hooks/useCookies';
import { formatEndDate, getEndDate, getTimeDiff } from '../utils/dateUtils';

export function Home() {

    const { updateCookieData, getCookieData, deleteCookie } = useCookies();

    const { preferencesData } = useContext(ParametersContext);




    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isWorkTimeInput, setIsWorkTimeInput] = useState(false);

    const [isWorkStarted, setIsWorkStarted] = useState(false);
    const [startTimeInput, setStartTimeInput] = useState({ hour: 8, minute: 30 });
    const [endTime, setEndTime] = useState('');
    const [result, setResult] = useState('');

    const [workJourney, setWorkJourney] = useState(preferencesData.workJourney);
    const [breakTime, setBreakTime] = useState(preferencesData.breakTime);
    const [extraTime, setExtraTime] = useState(preferencesData.extraTime);


    function handleWorkStart() {
        if (!isWorkTimeInput) {
            const now = new Date();
            setStartTimeInput({ hour: now.getHours(), minute: now.getMinutes() });
        }
        handleEndTimeSuggestion();
        setIsWorkStarted(true);
    }

    function handleReset() {
        onClose();
        setIsWorkStarted(false);
        setResult('');
        setStartTimeInput({ hour: 8, minute: 30 });
    }

    function handleEndTimeSuggestion() {
        const endTimeDate = getEndDate(startTimeInput, workJourney, breakTime, extraTime);

        const endDate = formatEndDate(endTimeDate);
        setEndTime(endDate);
    }

    function handleWorkStartTypeToggle() {
        if (isWorkTimeInput) {
            setStartTimeInput({ hour: 8, minute: 30 });
        }
        setIsWorkTimeInput(!isWorkTimeInput);
    }


    function handleEndWork() {
        const now = new Date();
        const endDate = { hour: now.getHours(), minute: now.getMinutes() }

        const endTimeDate = getEndDate(startTimeInput, workJourney, breakTime, extraTime);
        const startDate = { hour: endTimeDate.getHours(), minute: endTimeDate.getMinutes() }

        const timeDiff = getTimeDiff(startDate, endDate, extraTime);
        setResult(timeDiff);
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
            overflowY="hidden"
        >
            {!isWideVersion && (
                <Header
                    isWorkStarted={isWorkStarted && !result}
                    handleReset={handleReset}
                    handleParametersOpen={onOpen}
                />
            )}
            <VStack
                spacing="16"
                w="60vw"
                h="calc(100vh - 100px)"
                align="center"
                maxWidth={800}
                mb={isWideVersion ? "2" : "10"}
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
                                renderCondition={isWorkStarted && !result}
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
                    <VStack spacing="4">
                        <Box display="flex" w={300} h={150} alignItems="center" justifyContent="center">
                            {!isWorkTimeInput ? (
                                <ScaleFade initialScale={0.9} in={!isWorkTimeInput}>
                                    <Button
                                        colorScheme="yellow"
                                        onClick={handleWorkStart}
                                    >
                                        Start Work Now
                                    </Button>
                                </ScaleFade>
                            ) : (
                                <ScaleFade initialScale={0.9} in={isWorkTimeInput}>
                                    <VStack spacing="8" align="center">
                                        <HourMinuteInput
                                            label="Work Start Time"
                                            name="workStartTime"
                                            value={startTimeInput}
                                            parentCallback={setStartTimeInput}
                                            isDisabled={isWorkStarted}
                                        />
                                        <Flex >
                                            <Button
                                                colorScheme="yellow"
                                                onClick={handleWorkStart}
                                            >
                                                Start Work
                                            </Button>
                                        </Flex>
                                    </VStack>
                                </ScaleFade>
                            )}
                        </Box>
                        <SwitchInput
                            name="isWorkInputTime"
                            label="Wanna input work start time?"
                            labelPosition="left"
                            colorScheme="yellow"
                            onChange={handleWorkStartTypeToggle}
                        />
                    </VStack>
                )}

                {isWorkStarted && (
                    <>
                        <ScaleFade initialScale={0.9} in={isWorkStarted}>
                            <VStack spacing="4" align="center">
                                <Text fontSize="100" fontWeight="bold" color="yellow.400">{endTime}</Text>


                                {preferencesData.extraTime > 0 && !result && (
                                    <VStack spacing="1" align="center">
                                        <Text fontSize="16" color="gray.100" fontWeight="bold">Planned Extra Time</Text>
                                        <Text fontSize="16" color="gray.100">{`+ ${preferencesData.extraTime} min`}</Text>
                                    </VStack>
                                )}



                            </VStack>
                        </ScaleFade>
                        {result === '' && (
                            <Button
                                colorScheme="yellow"
                                onClick={handleEndWork}
                            >
                                End Work
                            </Button>
                        )}
                        <WorkResult result={result} renderCondition={!!result} />
                        {!!result && (
                            <Button
                                colorScheme="yellow"
                                onClick={handleReset}
                                leftIcon={<Icon as={FiRepeat} />}
                            >
                                Again
                            </Button>
                        )}
                    </>
                )}

            </VStack>
            <CookiesUseWarning />
            <ParametersModal isOpen={isOpen} onClose={onClose} />
        </Flex >
    );
}