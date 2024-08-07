import { PreferenceDto } from "@/dtos/preference_dto"
import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider"
import { useEffect, useState } from "react"

interface preferences {
    preferences: PreferenceDto
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>
}

export default function DistanceMax({preferences, setPreferences}: preferences) {

    useEffect(() => {
        setDistanceMax(preferences.distance)
    }, [preferences.distance])

    const handleCommit = () => {
        preferences.distance = distanceMax
        setPreferences(preferences)
    }
    
    const [distanceMax, setDistanceMax] = useState<number>(preferences.distance)

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex flex-row justify-between text-xl font-semibold">
                <h1>distance max</h1>
                <p>{distanceMax} KM</p>
            </div>
            <Slider value={[distanceMax]} max={6371} min={0} step={1} orientation="horizontal" onValueChange={(value) => {setDistanceMax(value[0])}}  className="relative flex items-center select-none touch-none w-[200px] h-5 w-full">
            <SliderTrack className="bg-primary relative grow rounded-full h-[3px]">
                <SliderRange className="bg-primary absolute rounded-full h-full">
                </SliderRange>
            </SliderTrack>
            <SliderThumb 
                className="block w-5 h-5 bg-secondary border-secondary border-2 rounded-[60px]  focus:outline-none "
                aria-label="Volume"
            />
            </Slider> 
        </div>
    )
}