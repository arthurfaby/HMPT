import { useAccountStore } from "@/stores/account-store"
import { Man, Woman} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getSexualPreferences, postSexualPreferences } from "@/services/api/preferencesApi";

export default function PreferenceSexual() {

    const {account, setAccount} = useAccountStore()
    const [ preferenceSexual, setPreferenceSexual ] = useState("bisexual")
    const [ loading, setLoading ] = useState(true)

    useEffect( () => {
    const initSexualPreference = async () => {
        const preference = await getSexualPreferences()
        setPreferenceSexual(preference)
        setLoading(false)
    }
    initSexualPreference()
    }, [])

    const handleChange = async (change: string) => {
        if (change == "homosexual" || change == "heterosexual" || change == "bisexual")
            await postSexualPreferences(change)
    }

    if (loading)
        return <></> 


    return (
        <div>
            <ToggleGroup onValueChange={handleChange} type="single" defaultValue={preferenceSexual}>
             <ToggleGroupItem variant="outline" value="homosexual">
                <h1>Homosexuel</h1>
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="heterosexual">
                <h1>Hétérosexuel</h1>
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="bisexual">
                <h1>Bisexuel</h1>
            </ToggleGroupItem>
            </ToggleGroup>
           
        </div>
    )
}