import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePassword } from "@/services/api/passwordApi";
import { Navigate, useNavigate } from "react-router-dom";
import  Home from "../../home/home";

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (newPassword: string, oldPassword: string) => {
        if(newPassword == oldPassword){
            const token = window.location.href.split('/').pop()
            if(!token) {
                toast.error('erreur de token') 
                navigate("/")
                return 
            }
            const response = await changePassword(newPassword, token)
            if (response.ok){
                toast.success('le mot de passe a été changé')
            }
            else{
                toast.error('erreur serveur')
            } 
            console.log("prout")
            navigate("/")
        }
        else {
            toast.error('les mots de passes sont differents')
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