import { Input } from "@/components/ui/input"
import { useAccountStore } from "@/stores/account-store"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Check, Pencil } from "lucide-react"
import  noImage  from "../../../assets/avatar-3814049_1920.png"
import { useRef, useState } from "react"
import PopoverString from "../../../components/utils/popoverString"

export function ProfilePicture() {

    const pictureRef = useRef<HTMLInputElement>(null)
    const { account, setAccount } = useAccountStore();
    const [printPicture, setPicture] = useState(account?.pictures[0] ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAACUCAMAAAA6cTwCAAAAMFBMVEXk5ueutLepsLPn6erq7O2xt7rS1dfd3+DY29y/w8amrbC2u77h4+TO0dPFycvV2Nk8w80nAAAE+0lEQVR4nO2da5ecIAxAhYCIPPz//7bgzE5nZ3VGIJjY7v2y7Yc99Z7E8BDSYegMJLxZQmYx+W+9/8WuwDAFK+aEzKSfwgUzXFQKvF+SjRQvyFnYyVM/XTkwmKh/6nxJ6Tj5S0UqZVuUOzp3KWkv5JR9xFuf1SklH/WTHgRMdB99VicdLxEmmOwRnRt24a8EQR8K0CNM7JUKAnQPE28lcKVCQjjOLxPociEhNF8lqPHhrFQXoZsS9bNvU/EO3ZGO+tm3gOIq96zEsOJBaBBKBG5KMFW/RDc0t9mDtwUzhS2kM9QO34ltPlkpUjs805xzGc1pcdGcc2uQLJ9RCRYEoaS0UIs8QAlRgs84u8woQoyChBSiFCQmY5JBCpEQM48xCSJWiFK5U9Q2K1g+iZlF2k1oSZeMOExYFVpdyDgGaQeYQizSDq/SrUb0QxIE1BhJ+h1JVb+7sIkmf5EUatKlIJHHCJCNBPm0AXM0ysiROkiNW0A/icQvkmrfYHiBemqnWvYdeRohF2/6eZBC2AR6MSKuDPhG+tfo1+j/M/r3ah36eERvhLo8EvQjLKDPgqjndQPOJv4TgdrIY6+PyL8ioa9hqYUGhSskBHXSoZdv6lI3YC/L5Ujtg711MjP4Fos8D6JPugECYpAYbKkmPOIYyyHp8qEtPCX6PeIMYH0qTyEi33684fFWfdQqX2DVBhmoTb4wWEFiURdWcII0swnRAObY1Y8PaMOjLmRgRDCaGUzpHgDC6S1pWZ1jRzgEqSdOQu2Ho4XgUxZupLxrE+KVc5lU71qEHLOcy8DS8CqxO7++Aku9EafC/UztqCQ5nEHbBMaq2RBfoaFuY2hm+Q49MO8vX28JkR+b+UTZpFUyWkHsUXS0mMfezyfU8TmeXljslHwEfDzkdJGL8hlQk/3opO2kriI05H4tk3X7PRqkcHG5Wg8XABO2paTUNpir+WQgd6KJ1snciOamkv6oXQyLv1K+fSNJmWkMMdqVGMM4GX/F8DyTex55s+JXx4sD6gcXdYL10f+mnHPunnc58YZriSUZMGMqCe8GI2dzfbiAVnrGtdPWse46UsesRf3Qu4CCJer5mM3DapY28CzmaUB1c92Gfvq1SH9J54U3bcMOh2r0nkUfuDTYTI06X1LCLoZ8Ng7ejLZ4Ib4vtXaBo5MCSOFxCOF5lhJ2JGtCCH60n5u6lTtJFycKJ/Chh89NKjmdnXsK+vmsZKdThUZX0tOt0smfNptQBv2Q9yY6nDOXAPxrYbs4c0KYFNpxjEPE3mFKAer9/nxH6r5hQjqKUaTU97DQ2LVi7zl1++gMw8kZ91Byfc7pg0G/xnJYqct3WphOf4WenQL6TA/G7pOE90oRWUmR1IRvShZVSaHfhydW4iCEqpRSjgVoSqrlwA8uOD1KU9mmFvkLxqd18JTj0A8w7i2SzRQ2aT+2htzgqBnpGo9Qt5yZ60Nj21WMU8/otN1/IVo/vKWp3e9E/fRbNOUdw5xLyOoFIMptiA7Ud2yv73vfmdrLcajXQpGpmzmg34HHYx5rlFTdUeeTqDKifuh3zDXlDrcHJzYVHWvw2+agIssPVeM2fkVHFi+U+E26XyhOO+ZJJ8pvA7OdLzwovRBjqB/4I4UtXtqvTnansLsi/9dI6LKFH35bOnR02ZG8mv+z7WR0WWk49xN/HWVt4fhsde9TVuxGIbkz7xS7P3e2S22fdhiPAAAAAElFTkSuQmCC")


    const handleSubmit = () => {
        if (!account || !pictureRef.current || pictureRef.current.value == "") {
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
        <div className="items-center justify-center">
            <Avatar className="flex border-2 border-primary h-[240px] w-[240px] rounded-full overflow-hidden ">
                <AvatarImage className="object-cover h-full w-full" src={printPicture}/>
                <AvatarFallback> 
                    <img src={noImage}>
                    </img>
                </AvatarFallback>
            </Avatar>
            <div className="relative">
            <div className="absolute bottom-0 right-8">
               <PopoverString pictureRef={pictureRef} onSubmit={handleSubmit} placeHolder="Url de la photo de profil" Icon={Pencil}></PopoverString> 
            </div>
            </div>
        </div>
            
    )
}