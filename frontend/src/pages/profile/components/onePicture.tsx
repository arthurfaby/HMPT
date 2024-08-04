import { Card, CardContent } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import PopoverString from "@/components/utils/popoverString";
import { Delete, DeleteForever } from "@mui/icons-material";

interface arrayPicture {
    pictures: string[]
    setPicture: React.Dispatch<React.SetStateAction<string[]>>
    index: number
}

export default function Picture({pictures, setPicture, index}: arrayPicture) {

    const pictureRef = useRef<HTMLInputElement>(null)
    const [ imageload, setimageload ] = useState<boolean>(false)

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

    const handleLoad = (() => {
        setimageload(true)
    })

    const handleDelete = (() => {
        const newPictures = [...pictures]
        if(index >= 0)
            newPictures[index] = ""
        setPicture(newPictures)
        setimageload(false)
    })
    
    return (
        <div className="flex flex-grow basis-48">
                <Avatar className=" relative grow flex size-full object-fill" onLoad={handleLoad}>
                    <AvatarImage src={pictures[index]} className="flex object-cover rounded-lg">
                    </AvatarImage>
                    {
                        imageload && (
                            <button >
                                <DeleteForever onClick={handleDelete} className="absolute -top-2 right-0 bg-secondary rounded-full"/>
                            </button>
                        )
                    }
                    <AvatarFallback className="flex size-full items-center justify-center">
                        <Card className="flex size-full">
                            <CardContent className="flex size-full bg-primary-foreground items-center justify-center">
                              <PopoverString pictureRef={pictureRef} onSubmit={handleClick} placeHolder="url de la photo" Icon={Plus}/>
                            </CardContent>
                        </Card>
                    </AvatarFallback>
                </Avatar>
        </div>
    )
}