import { PreferenceDto } from "@/dtos/preference_dto"
import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider"
import { useEffect, useState } from "react"

interface preferences {
    preferences: PreferenceDto
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>
}
export default function FamingGap({preferences, setPreferences}: preferences) {
    
    const [FamingMin, setFamingMin] = useState<number>(preferences.fame_rating_min)
    const [FamingMax, setFamingMax] = useState<number>(preferences.fame_rating_max)

    useEffect(() => {
        setFamingMin(preferences.fame_rating_min)
        setFamingMax(preferences.fame_rating_max)
    }, [preferences.fame_rating_min, preferences.fame_rating_max])


    const handleCommit = () => {
        preferences.fame_rating_min = FamingMin
        preferences.fame_rating_max= FamingMax
        setPreferences(preferences)
    } 

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex flex-row justify-between text-xl font-semibold">
                <h1>écart de popularité</h1>
                <p>{FamingMin} - {FamingMax}</p>
            </div>
            <Slider onValueCommit={handleCommit} value={[FamingMin, FamingMax]} max={1000} min={-1000} step={1} orientation="horizontal" onValueChange={(value) => {setFamingMin(value[0]); setFamingMax(value[1])}}  className="relative flex items-center select-none touch-none w-[200px] h-5 w-full">
            <SliderTrack className="bg-primary relative grow rounded-full h-[3px]">
                <SliderRange className="bg-primary absolute rounded-full h-full">
                </SliderRange>
            </SliderTrack>
            <SliderThumb 
                className="block w-5 h-5 bg-secondary border-secondary border-2 rounded-[60px]  focus:outline-none "
                aria-label="Volume"
            />
            <SliderThumb 
                className="block w-5 h-5 bg-secondary border-secondary border-2 rounded-[60px]  focus:outline-none "
                aria-label="Volume"
            />
            </Slider> 
        </div>
    )
}