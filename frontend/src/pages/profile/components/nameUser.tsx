import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/stores/account-store";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function NameUser() {
    const {account, setAccount} = useAccountStore()
    const [firstName, setFirstName] = useState(account?.first_name ?? "jean")
    const [lastName, setLastName] = useState(account?.last_name ?? "fil")

    const handleSubmit = () => {
        if (account) {
            account.first_name = firstName
            account.last_name = lastName
            setAccount(account)
        }
    }

    return (
        <div className="flex flex-row">
            <h1 className="px-2">{firstName} {lastName}</h1>
            <Popover >
                <PopoverTrigger asChild>
                <Pencil/>
                </PopoverTrigger>
                <PopoverContent >
                    <div>
                        <form className="flex flex-row">
                            <Input value={firstName} onChange={(event) => {setFirstName(event.target.value)}}></Input>
                            <Input value={lastName} onChange={(event) => {setLastName(event.target.value)}}></Input>
                            <PopoverClose type="submit" onClick={handleSubmit}>
                                <Check/>
                            </PopoverClose>
                        </form>
                    </div>
                    
                </PopoverContent>
                
            </Popover>
        </div>
        
    )

}