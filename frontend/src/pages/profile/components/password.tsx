import PopoverString from "@/components/utils/popoverString"
import { changePassword, changePasswordProfil } from "@/services/api/passwordApi"
import { useAccountStore } from "@/stores/account-store"
import { Pencil } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export default function Email() {

    const { account, setAccount } = useAccountStore()
    const usernameRef = useRef<HTMLInputElement>(null)
   
       const handleSubmit = async () => {
        if (!account || !usernameRef.current)
            return
        const newPassword = usernameRef.current.value
        const response = await changePasswordProfil(newPassword)
        if (response && "error" in response){
            toast.error(response.error)
        }
        else
            toast.success("votre mot de passe a bien ete modifier")
    }
    return (
        <div className="flex flex-row">
            <h1 className="px-2 font-bold text-2xl">Mot de Passe</h1>
            <PopoverString
                inputType="password"
                pictureRef={usernameRef} 
                onSubmit={handleSubmit} 
                placeHolder="nouvel email" 
                Icon={Pencil}
            />
        </div>
    )
}