import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { RangeSelector } from "@/components/utils/range-selector";
import { Check, PlusCircle } from "lucide-react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { UserDto } from "@/dtos/user_dto";
import { kyGET } from "@/utils/ky/handlers";
import { useAuth } from "@/hooks/useAuth";
import { MatchProfile } from "../matches/components/match-profile";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TAGS } from "@/types/tags_type";
import { MatchSwiper } from "../matches/components/match-swiper";
import { MatchCard } from "../matches/components/match-card";
import { getGPSDistance } from "@/utils/getGPSDistance";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type BadgeType = {
  key: number;
  value: string;
};

export function Research() {
  const { account, logout } = useAuth();

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(150);

  const [fameMin, setFameMin] = useState(0);
  const [fameMax, setFameMax] = useState(5);

  const [distance, setDistance] = useState(22000);

  const [users, setUsers] = useState<UserDto[]>([]);
  const [filterUsers, setFilterUsers] = useState<UserDto[]>([]);

  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    kyGET<UserDto[]>("matches/usersToMatch", logout).then((users) => {
      setUsers(users ?? []);
    });
  }, []);

  useEffect(() => {
    if (distance < 0) setDistance(0);
    if (distance > 22000) setDistance(22000);
  }, [distance]);

  const handleCheckboxChange = (tag: string) => {
    setInterests((prevCheckedTags) =>
      prevCheckedTags.includes(tag)
        ? prevCheckedTags.filter((item) => item !== tag)
        : [...prevCheckedTags, tag],
    );
  };

  const handleToggleChange = (value: string) => {
    if (value === "distance_asc") {
      setFilterUsers([
        ...filterUsers.sort(
          (a, b) =>
            getGPSDistance(account?.geolocation!, a.geolocation) -
            getGPSDistance(account?.geolocation!, b.geolocation),
        ),
      ]);
    } else if (value === "distance_desc") {
      setFilterUsers([
        ...filterUsers.sort(
          (a, b) =>
            getGPSDistance(account?.geolocation!, b.geolocation) -
            getGPSDistance(account?.geolocation!, a.geolocation),
        ),
      ]);
    } else if (value === "age_asc") {
      setFilterUsers([...filterUsers.sort((a, b) => a.age - b.age)]);
    } else if (value === "age_desc") {
      setFilterUsers([...filterUsers.sort((a, b) => b.age - a.age)]);
    } else if (value === "fame_rating_asc") {
      setFilterUsers([
        ...filterUsers.sort((a, b) => a.fame_rating - b.fame_rating),
      ]);
    } else if (value === "fame_rating_desc") {
      setFilterUsers([
        ...filterUsers.sort((a, b) => b.fame_rating - a.fame_rating),
      ]);
    } else if (value === "common_tags_asc") {
      setFilterUsers([
        ...filterUsers.sort(
          (a, b) =>
            interests.filter((i) => a.interests.includes(i)).length -
            interests.filter((i) => b.interests.includes(i)).length,
        ),
      ]);
    } else if (value === "common_tags_desc") {
      setFilterUsers([
        ...filterUsers.sort(
          (a, b) =>
            interests.filter((i) => b.interests.includes(i)).length -
            interests.filter((i) => a.interests.includes(i)).length,
        ),
      ]);
    }
  };

  useEffect(() => {
    let filteredUsers = users.filter((user) => {
      return (
        user.age >= ageMin &&
        user.age <= ageMax &&
        user.fame_rating >= fameMin &&
        user.fame_rating <= fameMax
      );
    });
    if (interests.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        interests.some((interest) => user.interests.includes(interest)),
      );
    }
    if (account?.geolocation !== null) {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          getGPSDistance(account?.geolocation!, user.geolocation) / 1000 <=
          distance
        );
      });
    }
    setFilterUsers(filteredUsers);
  }, [ageMin, ageMax, fameMin, fameMax, interests, users, distance]);

  return (
    <FullHeightContainer>
      <div className="w-full p-10">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-grow flex-wrap gap-4">
            <RangeSelector
              className="flex flex-grow basis-80 flex-col gap-2"
              limitMin={18}
              limitMax={150}
              minValue={ageMin}
              maxValue={ageMax}
              minText="Age min"
              maxText="Age max"
              setMinCallback={setAgeMin}
              setMaxCallback={setAgeMax}
            />
            <RangeSelector
              className="flex flex-grow basis-80 flex-col gap-2"
              limitMin={0}
              limitMax={5}
              minValue={fameMin}
              maxValue={fameMax}
              minText="Fame rating min"
              maxText="Fame rating max"
              setMinCallback={setFameMin}
              setMaxCallback={setFameMax}
              step={0.01}
            />
          </div>
          <div className="flex flex-grow flex-wrap gap-4">
            <div className="flex flex-grow basis-80 items-center gap-2">
              <label htmlFor="distance-selector" className="text-nowrap">
                Distance
              </label>
              <Input
                type="number"
                id="distance-selector"
                value={distance}
                onChange={(e) => setDistance(+e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-grow flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Interets</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {TAGS.map((tag, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    textValue={tag}
                    checked={interests.includes(tag)}
                    onCheckedChange={() => handleCheckboxChange(tag)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {filterUsers.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          Tri :
          <ToggleGroup
            type="single"
            className="flex flex-col gap-1"
            onValueChange={handleToggleChange}
          >
            <div className="flex w-full gap-1">
              <ToggleGroupItem
                variant={"outline"}
                value="distance_asc"
                className="flex-grow"
                aria-label="Toggle bold"
              >
                - distance
              </ToggleGroupItem>
              <ToggleGroupItem
                variant={"outline"}
                value="distance_desc"
                className="flex-grow"
                aria-label="Toggle italic"
              >
                + distance
              </ToggleGroupItem>
            </div>
            <div className="flex w-full gap-1">
              <ToggleGroupItem
                variant={"outline"}
                value="age_asc"
                className="flex-grow"
                aria-label="Toggle bold"
              >
                - age
              </ToggleGroupItem>
              <ToggleGroupItem
                variant={"outline"}
                value="age_desc"
                className="flex-grow"
                aria-label="Toggle italic"
              >
                + age
              </ToggleGroupItem>
            </div>
            <div className="flex w-full gap-1">
              <ToggleGroupItem
                variant={"outline"}
                value="fame_rating_desc"
                className="flex-grow"
                aria-label="Toggle bold"
              >
                - fame rating
              </ToggleGroupItem>
              <ToggleGroupItem
                variant={"outline"}
                value="fame_rating_asc"
                className="flex-grow"
                aria-label="Toggle italic"
              >
                + fame rating
              </ToggleGroupItem>
            </div>
            <div className="flex w-full gap-1">
              <ToggleGroupItem
                variant={"outline"}
                value="common_tags_desc"
                className="flex-grow"
                aria-label="Toggle bold"
              >
                - common tags
              </ToggleGroupItem>
              <ToggleGroupItem
                variant={"outline"}
                value="common_tags_asc"
                className="flex-grow"
                aria-label="Toggle italic"
              >
                + common tags
              </ToggleGroupItem>
            </div>
          </ToggleGroup>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 p-10">
        {filterUsers.length === 0 && (
          <div className="flex flex-col items-center gap-4">
            <strong>No users found</strong>
          </div>
        )}
        {filterUsers.map((user) => {
          return <MatchCard user={user} key={user.id} />;
        })}
      </div>
    </FullHeightContainer>
  );
}
