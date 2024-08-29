import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Badge } from "@/components/ui/badge";
import { Check, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PreferenceDto } from "@/dtos/preference_dto";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TAGS } from "@/types/tags_type";

interface NewBadge {
  key: number;
  value: string;
}

interface Preferences {
  preferences: PreferenceDto;
  setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>;
}

export default function InterestPreference({
  preferences,
  setPreferences,
}: Preferences) {
  const [badgeTotal, setBadgeTotal] = useState<NewBadge[]>([]);
  const interestRef = useRef<HTMLInputElement>(null);

  const [checkedTags, setCheckedTags] = useState<string[]>([]);

  useEffect(() => {
    setCheckedTags(preferences.interests);
  }, []);

  useEffect(() => {
    preferences.interests = checkedTags;
    setPreferences(preferences);
  }, [checkedTags]);

  const handleCheckboxChange = (tag: string) => {
    setCheckedTags((prevCheckedTags) =>
      prevCheckedTags.includes(tag)
        ? prevCheckedTags.filter((item) => item !== tag)
        : [...prevCheckedTags, tag],
    );
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Interets</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
  );
}
