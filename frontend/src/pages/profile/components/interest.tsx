import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Cross, Pencil, PlusCircle, X } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Interest() {

    const [badgeTotal, setBadgeTotal] = useState<ReactNode[]>([])
    const interestRef = useRef<HTMLInputElement>(null)

    const handleDelete = (index: number) => {
        setBadgeTotal(badgeTotal.filter((i) => i !== index))
    }
    
    const createBadge = (text: string, index: number) => {
        return (
                <Badge key={index} className="flex flex-row">
                    {text}
                    <Button onClick={() => handleDelete(index)}><X/></Button>
                </Badge>
        )
    }

    const handleClick = () => {
        if(interestRef.current && interestRef.current.value.length < 18)
            setBadgeTotal([...badgeTotal, createBadge(interestRef.current.value, badgeTotal.length)])
        else
            toast.error("max 18 caractere")
    }


    return (
        <div className="flex w-full max-w-[600px] h-full">
            <Card className="flex flex-col w-full h-full">
                <CardContent className="grid grid-cols-3 gap-4 place-items-center w-full">
                    {badgeTotal.length === 0 ? <p>dis-nous des centres d'interets</p> : badgeTotal}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Popover>
                        <PopoverTrigger asChild>
                        <button>
                            <PlusCircle/>
                        </button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom">
                            <form className="flex flex-row w-full">
                                <Input ref={interestRef} placeholder="nouvel interet"></Input>
                            <PopoverClose>
                                <button type="submit" onClick={handleClick} className="absolute bottom-2 right-0">
                                    <Check/>
                                </button>
                            </PopoverClose>
                            </form>
                        </PopoverContent>
                    </Popover>
                </CardFooter>
            </Card>
        </div>
    )

}