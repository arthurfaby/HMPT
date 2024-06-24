import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/stores/account-store";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";


export default function AgeUser() {
    const {account, setAccount} = useAccountStore()
    const [age, setAge] = useState<number>(account?.age ?? 0)

  useEffect(() => {
    console.log(age)
  }, [age]) 

  const handle = (value: number[]) => {
    setAge(value[0])
  }

  const handleSubmit = () => {
        if (account)
            account.age = age
  }

    return(
        <div className="flex flex-row">
            <h1 className="px-2">{age}</h1>
            <Popover >
                <PopoverTrigger asChild>
                <Pencil/>
                </PopoverTrigger>
                <PopoverContent className="flex flex-row">
                    <Slider defaultValue={[age]} max={150} min={18} step={1} orientation="horizontal" onValueChange={(value) => {setAge(value[0])}}  className="relative flex items-center select-none touch-none w-[200px] h-5">
                        <SliderTrack className="bg-green-500 relative grow rounded-full h-[3px]">
                            <SliderRange className="bg-blue-600 absolute rounded-full h-full">
                            </SliderRange>
                        </SliderTrack>
                        <SliderThumb 
                            className="block w-5 h-5 bg-red-600  rounded-[60px]  focus:outline-none "
                            aria-label="Volume"
                        />
                    </Slider>
                    <PopoverClose type="submit" onClick={handleSubmit}>
                            <Check/>
                    </PopoverClose>
                </PopoverContent>
            </Popover>
        </div>
    )
}