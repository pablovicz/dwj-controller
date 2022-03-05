import {
    Slider as ChakraSlider,
    SliderProps as ChakraSliderPros,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    FormControl,
    FormLabel,
    Tooltip
} from '@chakra-ui/react';
import { useState } from 'react';


interface SliderProps extends ChakraSliderPros{
    name: string;
    label: string;
    valueUnit: string;
    min: number;
    max: number;
    sliderMarks: number[];
    value: number;
    onChange: (val: number) => void;
    isDisabled?: boolean;
}


export function Slider({ label, name, valueUnit, min, max, sliderMarks, value, onChange,isDisabled = false, ...rest }: SliderProps) {

    const [showTooltip, setShowTooltip] = useState(false)


    return (
        <FormControl>
            {
                !!label && (<FormLabel htmlFor={name} mb="8">{label}</FormLabel>)
            }
            <ChakraSlider
                name={name}
                id={name}
                aria-label='slider-ex-6'
                onChange={(val) => onChange(val)}
                value={value}
                min={min}
                max={max}
                colorScheme="yellow"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                isDisabled={isDisabled}
                {...rest}
            >
                {sliderMarks.map(mark => (
                    <SliderMark key={mark} value={mark} mt='4' ml='-1' fontSize='sm'>
                        {mark}
                    </SliderMark>
                ))}
                <SliderTrack >
                    <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg='yellow.500'
                    color='gray.600'
                    placement='top'
                    isOpen={showTooltip}
                    label={`${value} ${valueUnit}`}
                >
                    <SliderThumb />
                </Tooltip>

            </ChakraSlider>
        </FormControl>
    );
}