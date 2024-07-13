import { Card, CardContent } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef } from "react";
import PopoverString from "./popoverString";

interface arrayPicture {
    pictures: string[]
    setPicture: React.Dispatch<React.SetStateAction<string[]>>
    index: number
}

export default function Picture({pictures, setPicture, index}: arrayPicture) {

    const pictureRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!pictureRef || !pictureRef.current || pictureRef.current.value == "")
            return 
        const newPictures = [...pictures]
        if(index >= 0)
            newPictures[index] = pictureRef.current.value 
        setPicture(newPictures)
    }, [pictureRef])

    const handleClick = (() => {
        if (!pictureRef || !pictureRef.current || pictureRef.current.value == "")
            return
        const newPictures = [...pictures]
        if(index >= 0)
            newPictures[index] = pictureRef.current.value 
        setPicture(newPictures)
    })

    return (
        <div className="flex flex-grow basis-48">
                <Avatar className=" grow flex size-full object-fill">
                    <AvatarImage src={pictures[index]} className="flex object-cover rounded-lg"></AvatarImage>
                    <AvatarFallback className="flex size-full items-center justify-center">
                        <Card className="flex size-full">
                            <CardContent className="flex size-full bg-primary-foreground items-center justify-center">
                              <PopoverString pictureRef={pictureRef} onSubmit={handleClick} placeHolder="nouvelle photo"/>
                            </CardContent>
                        </Card>
                    </AvatarFallback>
                </Avatar>
        </div>
    )
}