import { Input } from "@/components/ui/input"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Check, PlusCircle } from "lucide-react"
import { JSXElementConstructor } from "react"
import { JsxElement } from "typescript"

interface newPicture {
    pictureRef: React.Ref<HTMLInputElement>
    onSubmit: () => void
    placeHolder: string
    Icon: React.ElementType
}

export default function PopoverString({pictureRef, onSubmit, placeHolder, Icon}: newPicture) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="inline-flex h-[30px] w-[30px] rounded-full bg-secondary items-center justify-center">
                    <Icon className="h-2/3"/>
                </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" sideOffset={5} >
                <form className="flex flex-row w-full">
                    <Input ref={pictureRef} placeholder={placeHolder}></Input>
                    <PopoverClose>
                        <button type="submit" className="absolute bottom-2 right-0" onClick={onSubmit}>
                            <Check/>
                        </button>
                    </PopoverClose>
                </form>
            </PopoverContent>
        </Popover> 
)
}