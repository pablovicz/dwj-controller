import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Flex,
    Spinner,
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { ParametersContext } from '../../service/contexts/ParametersContext';
import { Slider } from '../Slider';

interface ParametersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ParametersModal({ isOpen, onClose }: ParametersModalProps) {

    const { saveParametersData, getSavedPreferences } = useContext(ParametersContext);  

    const [loading, setLoading] = useState(true);

    const [workJourney, setWorkJourney] = useState(8);
    const [breakTime, setBreakTime] = useState(90);
    const [extraTime, setExtraTime] = useState(0);


    

    function handleSaveParameters() {
        saveParametersData(workJourney, breakTime, extraTime);
        handleCloseModal();
    }


    const handleCloseModal = (): void => {
        onClose();
    };

    useEffect(() => {
        
        const preferences = getSavedPreferences();
        if (preferences) {
            setWorkJourney(preferences.workJourney);
            setBreakTime(preferences.breakTime);
            setExtraTime(preferences.extraTime);
        }
        setLoading(false);
    }, [getSavedPreferences])


    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            isCentered
            size="md"
        >
            <ModalOverlay />
            <ModalContent bgColor="gray.800">
                <ModalHeader color="yellow.500">Parameters</ModalHeader>
                <ModalCloseButton />
                <ModalBody w="95%">
                    {loading ? (
                        <Flex h="100%" w="100%" align="center" justify="center">
                            <Spinner color="yellow.500" size='md'/>
                        </Flex>
                    ): (
                        <VStack spacing = "4">
                        <Slider
                            name = "workJourney"
                            label = "Work Journey"
                            value = { workJourney }
                            onChange = { setWorkJourney }
                            min = { 4 }
                            max = { 12 }
                            sliderMarks = { [6, 8, 10] }
                            valueUnit = "hrs"
                        />
                    <Slider
                        name="breakTime"
                        label="Break Time"
                        value={breakTime}
                        onChange={setBreakTime}
                        min={30}
                        max={120}
                        sliderMarks={[60, 90]}
                        valueUnit="hrs"
                        step={5}
                    />
                    <Slider
                        name="extraHours"
                        label="Extra Time"
                        value={extraTime}
                        onChange={setExtraTime}
                        min={0}
                        max={120}
                        sliderMarks={[30, 60, 90]}
                        valueUnit="min"
                        step={5}
                    />
                </VStack>
                   )}
            </ModalBody>

            <ModalFooter alignItems="end" mt="6">
                <Button
                    onClick={() => handleSaveParameters()}
                    colorScheme="yellow"
                >
                    SAVE
                </Button>
            </ModalFooter>
        </ModalContent>
        </Modal >
    );
}