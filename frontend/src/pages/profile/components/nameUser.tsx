import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/stores/account-store";
import { Arrow, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function NameUser() {
    const {account, setAccount} = useAccountStore()
    const [firstName, setFirstName] = useState(account?.first_name ?? "jean")
    const [lastName, setLastName] = useState(account?.last_name ?? "fil")

    const submitFirstName = () => {
        if (account)
            account.first_name = firstName
        setAccount(account)
    }

    const handleSubmit = () => {
        if (account) {
            account.first_name = firstName
            account.last_name = lastName
            setAccount(account)
        }
    }

    return (
        <div className="flex flex-row h-full">
            <h1 className="px-2 font-bold text-2xl">{firstName} {lastName}</h1>
                <Popover>
                    <PopoverTrigger asChild>
                    <button className="inline-flex h-[30px] w-[30px] rounded-full bg-secondary items-center justify-center">
                        <Pencil className="h-2/3"/>
                    </button>
                    </PopoverTrigger>
                    <PopoverContent side="right">
                        <Card className="w-full flex flex-col items-center justify-center p-2">
                            <form className="flex flex-col p-8 gap-4 items-center">
                                <label>Prenom</label>
                                <Input value={firstName} onChange={(event) => {setFirstName(event.target.value)}}></Input>
                                <label>nom</label>
                                <Input value={lastName} onChange={(event) => {setLastName(event.target.value)}}></Input>
                            </form>
                                <PopoverClose className="w-full">
                                    <Button type="submit" onClick={handleSubmit} className="w-full">
                                        <Check/>
                                    </Button>
                                </PopoverClose> 
                        </Card> 
                        <Arrow className="fill-primary"/>
                    </PopoverContent>
                </Popover>
            </div>
    )

}