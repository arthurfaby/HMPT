import { PreferenceDto } from "@/dtos/preference_dto"
import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider"
import { useEffect, useState } from "react"

interface preferences {
    preferences: PreferenceDto
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>
}

export default function AgeGap({preferences, setPreferences}: preferences) {
    
    const [ageMin, setAgeMin] = useState<number>(preferences.age_gap_min)
    const [ageMax, setAgeMax] = useState<number>(preferences.age_gap_max)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setAgeMin(preferences.age_gap_min)
        setAgeMax(preferences.age_gap_max)
        setLoading(true)
    }, [preferences.age_gap_min, preferences.age_gap_max])

    const handleCommit = () => {
        preferences.age_gap_min = ageMin
        preferences.age_gap_max = ageMax
        setPreferences(preferences)
    }

    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex flex-row justify-between text-xl font-semibold">
                <h1> écart d'age</h1>
                <p>{ageMin} - {ageMax}</p>
            </div>
            <Slider value={[preferences.age_gap_min, preferences.age_gap_max]} max={150} min={18} step={1} orientation="horizontal" onValueChange={(value) => {setAgeMin(value[0]); setAgeMax(value[1])}} onValueCommit={handleCommit} className="relative flex items-center select-none touch-none w-[200px] h-5 w-full">
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