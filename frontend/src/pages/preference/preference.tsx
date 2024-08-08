import { Card, CardContent } from "@/components/ui/card"
import AgeGap from "./components/ageGap"
import { FullHeightContainer } from "@/components/utils/full-height-container"
import FamingGap from "./components/famingGap"
import DistanceMax from "./components/distance"
import Interest from "./interestPreference"
import { useEffect, useState } from "react"
import { getPreferences, postPreferences } from "@/services/api/preferencesApi"
import { Button } from "@/components/ui/button"
import { PreferenceDto } from "@/dtos/preference_dto"
import { toast } from "sonner"

export default function Preference() {

    const [preferences, setPreferences] = useState<PreferenceDto>({
        id: 0,
        user_id: 0,
        age_gap_min: 18,
        age_gap_max: 150,
        fame_rating_min: 0,
        fame_rating_max: 1000,
        sexual_preference: "bisexual",
        distance: 0,
        interests: []
    })

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const userPreference = await getPreferences()
                if(userPreference)
                    setPreferences(userPreference)
            }
            catch {
                console.log("error while fetching preferences")
            }
        }
        fetchPreferences()
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await postPreferences(preferences)
            if (response)
                toast.success("les préférences ont été sauvegardées")
        }
        catch {
            console.log("error save preferences")}
        }

    return (
        <FullHeightContainer className="flex flex-col items-center justify-center gap-10">
            <Card className="flex w-2/4 items-center justify-center">
                <CardContent className="flex w-full">
                    <AgeGap preferences={preferences} setPreferences={setPreferences}/>
                </CardContent>
            </Card>
            <Card className="flex w-2/4 items-center justify-center">
                <CardContent className="flex w-full">
                    <FamingGap preferences={preferences} setPreferences={setPreferences}/>
                </CardContent>
            </Card>
            <Card className="flex w-2/4 items-center justify-center">
                <CardContent className="flex w-full">
                    <DistanceMax preferences={preferences} setPreferences={setPreferences}/>
                </CardContent>
            </Card>
            <Interest preferences={preferences} setPreferences={setPreferences}/>
            <Button type="submit" onClick={handleSubmit}> enregistrez </Button>
        </FullHeightContainer>
    )
}