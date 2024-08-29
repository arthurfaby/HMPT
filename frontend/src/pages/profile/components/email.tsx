import PopoverString from "@/components/utils/popoverString"
import { useAccountStore } from "@/stores/account-store"
import { Pencil } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Email() {

    const { account, setAccount } = useAccountStore()
    const [email, setEmail] = useState<string>("username")
    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(account)
            setEmail(account.email)
    }, [])

    const handleSubmit = async () => {
        if (!account || !usernameRef.current)
            return
        const newUsername = usernameRef.current.value
        setEmail(newUsername)
        account.username = newUsername 
        setAccount(account)
    }
    return (
        <div className="flex flex-row">
            <h1 className="px-2 font-bold text-2xl">{email}</h1>
            <PopoverString
                inputType="email"
                pictureRef={usernameRef} 
                onSubmit={handleSubmit} 
                placeHolder="nouvel email" 
                Icon={Pencil}
            />
        </div>
    )
}


