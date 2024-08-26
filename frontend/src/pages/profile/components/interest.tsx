import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccountStore } from "@/stores/account-store";
import { TAGS } from "@/types/tags_type";
import { useEffect, useState } from "react";

interface newBadge {
    key: number,
    value: string
}

export default function Interest() {

    const { account, setAccount } = useAccountStore()
    const [checkedTags, setCheckedTags] = useState<string[]>([])

    useEffect(() => {
        if (!account)
            return
        if(!account.interests)
            account.interests = []
        setCheckedTags(account.interests) 
    }, [])

    useEffect(() => {
        if(account){
            account.interests = checkedTags
            setAccount(account)
        }
    }, [checkedTags])

    const handleCheckboxChange = (tag: string) => {
        setCheckedTags(prevCheckedTags => 
            prevCheckedTags.includes(tag) ?
            prevCheckedTags.filter(item => item !== tag)
            : [...prevCheckedTags, tag]
        )
        if (account){
            account.interests = checkedTags
            setAccount(account)
        }
    }
    return (
      <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Interets</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                {TAGS.map((tag, index) => (
                    <DropdownMenuCheckboxItem 
                        key={index} 
                        textValue={tag}
                        checked={checkedTags.includes(tag)}
                        onCheckedChange={() => handleCheckboxChange(tag)}
                        onSelect={(e) => e.preventDefault()}
                    >
                        {tag}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div> 
    )

}
