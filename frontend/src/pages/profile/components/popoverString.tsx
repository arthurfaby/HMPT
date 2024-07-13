import { Input } from "@/components/ui/input"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Check, PlusCircle } from "lucide-react"
import { JsxElement } from "typescript"

interface newPicture {
    pictureRef: React.Ref<HTMLInputElement>
    onSubmit: () => void
    placeHolder: string
    Icon: JsxElement
}

export default function PopoverString({pictureRef, onSubmit, placeHolder, Icon}: newPicture) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button>
                    <PlusCircle />
                </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" sideOffset={5} >
                <form className="flex flex-row w-full">
                    <Input ref={pictureRef} placeholder={placeHolder}></Input>
                    <PopoverClose>
                        <button type="submit" className="absolute bottom-2 right-0" onClick={onSubmit}>
                             <Icon/>
                        </button>
                    </PopoverClose>
                </form>
            </PopoverContent>
        </Popover> 
)
}