import { Textarea } from "@/components/ui/textarea";
import { useAccountStore } from "@/stores/account-store";
import { useEffect, useState } from "react";

export default function Biography() {
    const { account, setAccount } = useAccountStore()
    const [Biography, setBiography] = useState("")

    useEffect( () => {
        if(account && account.biography) {
            setBiography(account.biography)
        }
    }, [])

    useEffect(() => {
        if(!account) 
            return
        account.biography = Biography
        setAccount(account)
    }, [Biography])

    return (
        <div className="flex w-full max-w-[600px] h-full">
            <Textarea rows={7}className="resize-none" placeholder="parle-nous de toi !" value={Biography} onChange={(e) => {setBiography(e.currentTarget.value)}}></Textarea>
        </div>
    )
}