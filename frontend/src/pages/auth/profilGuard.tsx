import { useAuth } from "@/hooks/useAuth";
import { useAccountStore } from "@/stores/account-store";
import User from "@/types/user";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

function verifyArrayPictures(array: string[]) : boolean {
  if (array.length < 2) {
    return false
}
  for (let i = 1; i < array.length; i++) {
    console.log(array[i])
    if (array[i] === undefined || array[i] === null || array[i] === '') {
      return false
    }
  }
  return true
}

function isCompleted(user: User): boolean {
  
  const profil = [
    { key: 'gender', keyFrench: 'ton genre' },
    { key: 'biography', keyFrench: 'ta biographie' },
    { key: 'interests', keyFrench: "tes centres d'intérêts"},
    { key: 'pictures', keyFrench: '5 photos de toi'},
    { key: 'age', keyFrench: 'ton age'}
  ]
  
const profilCompleted = profil.filter(profil => !user || 
  !user[profil.key as keyof User] ||
  (profil.key === 'age' && user[profil.key as keyof User] === 0) ||
  (profil.key === 'interests' && user[profil.key as keyof User] && [profil.key as keyof User].length == 0) ||
  (profil.key === 'pictures' && user[profil.key as keyof User] && !verifyArrayPictures(user[profil.key as keyof User] as string[])))
 if (profilCompleted.length  == 0) 
    return true

  let keyMessage = profilCompleted.map(profil => profil.keyFrench).join(', ')
  if (user.pictures[0] === undefined || user.pictures[0] === null) 
    keyMessage = keyMessage + ', ta photo de profil'
  toast.error(`complète ces informations avant de continuer: ${keyMessage}`)
  return false
}
export default function ProfilGuard(props: PropsWithChildren) {
    const { account } = useAccountStore()

    if (account && isCompleted(account))
        return <Outlet/>
    else {
        return <Navigate to={'/profile'} replace={true}/>
    }
}