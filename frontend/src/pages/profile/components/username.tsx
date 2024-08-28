import { useAccountStore } from "@/stores/account-store";
import { useEffect, useRef, useState } from "react";
import PopoverString from "../../../components/utils/popoverString"
import { Pencil } from "lucide-react";
import { usernameValid } from "@/services/api/userApi";
import { toast } from "sonner";

export default function Username() {

    const { account, setAccount } = useAccountStore()
    const [username, setUsername] = useState<string>("username")
    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(account)
            setUsername(account.username)
    }, [])

    const handleSubmit = async () => {
        if (!account || !usernameRef.current)
            return
        const newUsername = usernameRef.current.value
        const response = await usernameValid(newUsername)
        if(response && "error" in response)
        {
            toast.error(response.error as string)
            return
        }
        setUsername(newUsername)
        account.username = newUsername 
        setAccount(account)
    }
    return (
        <div className="flex flex-row">
            <h1 className="px-2 font-bold text-2xl">{username}</h1>
            <PopoverString
                pictureRef={usernameRef} 
                onSubmit={handleSubmit} 
                placeHolder="nouveau username" 
                Icon={Pencil}
            />
        </div>
    )
}