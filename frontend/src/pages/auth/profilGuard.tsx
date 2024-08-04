import { useAuth } from "@/hooks/useAuth";
import { useAccountStore } from "@/stores/account-store";
import User from "@/types/user";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

function isCompleted(user: User): boolean {
  
  const profil = [
    { key: 'gender', keyFrench: 'ton genre' },
    { key: 'biography', keyFrench: 'ta biographie' },
    { key: 'interests', keyFrench: "tes centres d'intérêts"},
    { key: 'pictures', keyFrench: 'tes 5 Photos'},
    { key: 'age', keyFrench: 'ton age'}
  ]
  
const profilCompleted = profil.filter(profil => !user || !user[profil.key as keyof User] || (profil.key === 'age' && user[profil.key as keyof User] === 0))
 if (profilCompleted.length > 0) {
    const keyMessage = profilCompleted.map(profil => profil.keyFrench).join(', ')
    toast.error(`complète ces informations avant de continuer: ${keyMessage}`)
    return false
 }

  return true
}
export default function ProfilGuard(props: PropsWithChildren) {
    const { account } = useAccountStore()

    if (account && isCompleted(account))
        return <Outlet/>
    else {
        return <Navigate to={'/profile'} replace={true}/>
    }
}