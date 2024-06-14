import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePassword } from "@/services/api/passwordApi";

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (newPassword: string, oldPassword: string) => {
        if(newPassword == oldPassword){
            const token = window.location.href.split('/').pop()
            if(token)
                changePassword(newPassword, token)
        }
        else{
            toast.error('mots de passe différent')
        }
        
    }

    return ( 
        <FullHeightContainer className="flex-center flex-col flex-grid gap-8">
            <Input type="text" placeholder="Nouveau mot de passe" value={newPassword} onChange={(event) => setNewPassword(event.currentTarget.value)} className="w-6/12"/>
            <Input type="text" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(event) => setConfirmPassword(event.currentTarget.value)} className="w-6/12"/>
            <Button onClick={() => handleSubmit(newPassword, confirmPassword)}>changez le mot de passe</Button>
        </FullHeightContainer>
    )
}