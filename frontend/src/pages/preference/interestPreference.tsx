import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Badge } from "@/components/ui/badge";
import { Check, PlusCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { PreferenceDto } from "@/dtos/preference_dto"

interface newBadge {
    key: number
    value: string
}

interface preferences {
    preferences: PreferenceDto
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>
}

export default function InterestPreference({preferences, setPreferences}: preferences) {

    const [badgeTotal, setBadgeTotal] = useState<newBadge[]>([])
    const interestRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!preferences.interests)
            preferences.interests = []
        
        const newBadges : newBadge[] = []
        preferences.interests.forEach((interest: string) => {
            newBadges.push({ value: interest, key: newBadges.length })
        })
        setBadgeTotal(newBadges)
    }, [preferences.interests])

    const handleDelete = (index: number) => {
        setBadgeTotal(badgeTotal.filter((badge: newBadge) => badge.key !== index))
        preferences.interests = preferences.interests.filter((interest) => interest !== badgeTotal[index].value)
        setPreferences(preferences)
        }

    const handleClick = () => {
        if (interestRef.current && interestRef.current.value && interestRef.current.value.length < 18) {
            setBadgeTotal([...badgeTotal, { value: interestRef.current.value, key: badgeTotal.length }])
            preferences.interests = [...preferences.interests, interestRef.current.value]
            setPreferences(preferences)
        }
        else {
            toast.error("max 18 caractere")
        }
    }


    return (
        <div className="flex w-full max-w-[600px] h-full">
            <Card className="flex flex-col w-full h-full">
                <CardContent className="flex flex-row flex-wrap justify-center gap-4 py-2">
                    {badgeTotal.length === 0 ? <p>centre d'interet recherché</p> : badgeTotal.map((badge) => {
                        return (
                            <Badge key={badge.key} className="relative pr-6">
                                <div className="text-base">
                                    {badge.value}
                                </div>
                                <button className="absolute right-1 bottom-[6px]" onClick={() => handleDelete(badge.key)}><CrossCircledIcon className="size-[15px] font-bold"/></button>
                            </Badge>
                        )
                    })}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Popover>
                        <PopoverTrigger asChild>
                                <PlusCircle />
                        </PopoverTrigger>
                        <PopoverContent side="bottom" sideOffset={5} >
                            <form className="flex flex-row w-full">
                                <Input ref={interestRef} placeholder="nouvel interet"></Input>
                                <PopoverClose>
                                    <Check type="submit" onClick={handleClick} className="absolute bottom-2 right-0"/>
                                </PopoverClose>
                            </form>
                        </PopoverContent>
                    </Popover>
                </CardFooter>
            </Card>
        </div>
    )
}
