import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import Form from "@/pages/auth/register/components/form"
import { useAccountStore } from "@/stores/account-store"
import User from "@/types/user"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Check, Pencil } from "lucide-react"
import { ChangeEvent, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react"

export function ProfilePicture() {

    const pictureRef = useRef<HTMLInputElement>(null)
    const { account, setAccount } = useAccountStore();
    const [printPicture, setPicture] = useState(account?.pictures[0] ?? "")

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!(account && pictureRef.current)) {
            return;
        }
            if (!Array.isArray(account.pictures)){
                account.pictures = []
                account.pictures.push(pictureRef.current.value)
            }
            else
                account.pictures[0] = pictureRef.current.value
            setPicture(account.pictures[0])
            setAccount(account)
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Avatar className="border-2 border-white h-[240px] w-[240px] rounded-full overflow-hidden ">
            <AvatarImage className="object-cover h-full w-full" src={printPicture}/>
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="relative bottom-0 left-0 rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-secondary"
                        aria-label="Edit profile picture"
                    >
                   <Pencil/>
                   </button>
                </PopoverTrigger>
                <PopoverContent >
                    <form className="flex flex-row">
                        <Input ref={pictureRef}></Input>
                    <PopoverClose>
                        <button type="submit" onClick={handleSubmit}>
                            <Check/>
                        </button>
                    </PopoverClose>
                    </form>
                </PopoverContent>
                
            </Popover>
            </div>
    )
}