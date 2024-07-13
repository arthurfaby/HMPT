import { Toggle } from "@/components/ui/toggle"
import { useAccountStore } from "@/stores/account-store"
import { Man, Woman} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Gender() {

    const {account, setAccount} = useAccountStore()
    const [ gender, setGender ] = useState(account?.gender ?? "")

    const handleChange = (change: string) => {
        if(change == "male" && account)
            account.gender = "male"
        else if (account)
            account.gender = "female"
        setAccount(account)
    }


    return (
        <div>
            <ToggleGroup onValueChange={handleChange} type="single" defaultValue={gender}>
             <ToggleGroupItem variant="outline" value="male">
                <Man/>
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="female">
                <Woman/>
            </ToggleGroupItem>
            </ToggleGroup>
           
        </div>
    )
}