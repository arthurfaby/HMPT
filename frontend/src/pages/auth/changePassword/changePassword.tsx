import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePassword } from "@/services/api/passwordApi";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const isLengthValid = newPassword.length >= 8;
        const isUpperCaseValid = /[A-Z]/.test(newPassword);
        const isLowerCaseValid = /[a-z]/.test(newPassword);
        const isDigitValid = /[0-9]/.test(newPassword);
        const isSymbolValid = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
          newPassword,
        );
        if (
          isLengthValid &&
          isUpperCaseValid &&
          isLowerCaseValid &&
          isDigitValid &&
          isSymbolValid
        ) {
          setPasswordError(null);
        } else {
          setPasswordError(
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
          );
        }
      }, [newPassword]);

    const handleSubmit = async (newPassword: string, oldPassword: string) => {
        if(newPassword === oldPassword){
            const token = window.location.href.split('/').pop()
            if(!token) {
                toast.error('erreur de token') 
                navigate("/")
                return 
            }
            const response = await changePassword(newPassword, token)
            if ('error' in response){
                toast.error(response.error)
            }
            else{
                toast.success('le mot de passe a été changé')
                navigate("/")
            } 
        }
        else {
            toast.error('les mots de passes sont differents')
        }
    }

    return ( 
        <FullHeightContainer className="flex-center flex-col flex-grid gap-8">
            <Input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={(event) => setNewPassword(event.currentTarget.value)} className="w-6/12"/>
            {passwordError && (
             <span className="text-xs text-red-500">{passwordError}</span>
            )}
            <Input type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={(event) => setConfirmPassword(event.currentTarget.value)} className="w-6/12"/>
            <Button onClick={() => handleSubmit(newPassword, confirmPassword)}>changez le mot de passe</Button>
        </FullHeightContainer>
    )
}