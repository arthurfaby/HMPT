import { useAccountStore } from "@/stores/account-store"
import { Man, Woman} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getSexualPreferences } from "@/services/api/preferencesApi";

export default function PreferenceSexual() {

    const {account, setAccount} = useAccountStore()
    const [ preferenceSexual, setPreferenceSxual ] = useState("bisexual")

    useEffect( () => {
    const sexpref = getSexualPreferences()
    console.log(sexpref)
    }, [])

    const handleChange = (change: string) => {
        setAccount(account)
    }


    return (
        <div>
            <ToggleGroup onValueChange={handleChange} type="single" defaultValue={preferenceSexual}>
             <ToggleGroupItem variant="outline" value="male">
                <h1>Homosexuel</h1>
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="heterosexual">
                <h1>Hétérosexuel</h1>
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="Bisexuel">
                <h1>Bisexuel</h1>
            </ToggleGroupItem>
            </ToggleGroup>
           
        </div>
    )
}