import { useAccountStore } from "@/stores/account-store";
import User from "@/types/user";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

function verifyArrayPictures(array: string[]) : boolean {
  if (array.length < 1) {
    return false
}
    if (array[0] === undefined || array[0] === null || array[0] === '') {
      return false
    }
  return true
}

function isCompleted(user: User): boolean {
  
  const profil = [
    { key: 'gender', keyFrench: 'votre genre' },
    { key: 'biography', keyFrench: 'votre biographie' },
    { key: 'interests', keyFrench: "vos centres d'intérêts"},
    { key: 'pictures', keyFrench: 'votre photo de profil'},
    { key: 'age', keyFrench: 'ton age'}
  ]
  
const profilCompleted = profil.filter(profil => !user || 
  !user[profil.key as keyof User] ||
  (profil.key === 'age' && user[profil.key as keyof User] === 0) ||
  (profil.key === 'interests' && user[profil.key as keyof User] && [profil.key as keyof User].length === 0) ||
  (profil.key === 'pictures' && user[profil.key as keyof User] && !verifyArrayPictures(user[profil.key as keyof User] as string[])))
 if (profilCompleted.length  === 0) 
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