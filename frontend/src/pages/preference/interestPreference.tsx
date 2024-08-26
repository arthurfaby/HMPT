import { useEffect, useRef, useState } from "react"
import { PreferenceDto } from "@/dtos/preference_dto"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TAGS } from "@/types/tags_type";

interface preferences {
    preferences: PreferenceDto
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>
}

export default function InterestPreference({preferences, setPreferences}: preferences) {

    const [checkedTags, setCheckedTags] = useState<string[]>([])

    useEffect(() => {
        setCheckedTags(preferences.interests) 
    }, [])

    useEffect(() => {
        preferences.interests = checkedTags
        setPreferences(preferences)
    }, [checkedTags])

    const handleCheckboxChange = (tag: string) => {
        setCheckedTags(prevCheckedTags => 
            prevCheckedTags.includes(tag) ?
            prevCheckedTags.filter(item => item !== tag)
            : [...prevCheckedTags, tag]
        )
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
