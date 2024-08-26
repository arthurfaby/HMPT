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

type BadgeType = {
  key: number;
  value: string;
};

export function Research() {
  const { logout } = useAuth();
  const interestRef = useRef<HTMLInputElement>(null);

  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(150);

  const [fameMin, setFameMin] = useState(0);
  const [fameMax, setFameMax] = useState(5);

  const [distance, setDistance] = useState(0);

  const [interests, setInterests] = useState<BadgeType[]>([]);

  const [users, setUsers] = useState<UserDto[]>([]);

  const [profileOpen, setProfileOpen] = useState(true);

  const handleOpenProfile = () => {
    setProfileOpen(!profileOpen);
  };

  useEffect(() => {
    kyGET<UserDto[]>("matches/usersToMatch", logout).then((users) => {
      setUsers(users ?? []);
    });
  }, []);

  useEffect(() => {
    if (distance < 0) setDistance(0);
    if (distance > 22000) setDistance(22000);
  }, [distance]);

  const handleBadgeDelete = (index: number) => {
    setInterests(interests.filter((badge: BadgeType) => badge.key !== index));
  };

  const handleBadgeClick = () => {
    if (
      interestRef.current &&
      interestRef.current.value &&
      interestRef.current.value.length < 18
    ) {
      setInterests([
        ...interests,
        { value: interestRef.current.value, key: interests.length },
      ]);
    } else {
      toast.error("Maximum 18 caractères.");
    }
  };

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
              setMin={setAgeMin}
              setMax={setAgeMax}
            />
            <RangeSelector
              className="flex flex-grow basis-80 flex-col gap-2"
              limitMin={0}
              limitMax={5}
              minValue={fameMin}
              maxValue={fameMax}
              minText="Fame rating min"
              maxText="Fame rating max"
              setMin={setFameMin}
              setMax={setFameMax}
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
            <div className="flex flex-grow basis-80 items-center gap-2">
              <Card className="flex h-full w-full flex-col">
                <CardContent className="flex flex-row flex-wrap justify-center gap-4 py-2">
                  {interests.length === 0 ? (
                    <p>Centres d'intérêts recherchés</p>
                  ) : (
                    interests.map((badge) => {
                      return (
                        <Badge key={badge.key} className="relative pr-6">
                          <div className="text-base">{badge.value}</div>
                          <button
                            className="absolute bottom-[6px] right-1"
                            onClick={() => handleBadgeDelete(badge.key)}
                          >
                            <CrossCircledIcon className="size-[15px] font-bold" />
                          </button>
                        </Badge>
                      );
                    })
                  )}
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <PlusCircle />
                    </PopoverTrigger>
                    <PopoverContent side="bottom" sideOffset={5}>
                      <form className="flex w-full flex-row">
                        <Input
                          ref={interestRef}
                          placeholder="Nouvel intérêt"
                        ></Input>
                        <PopoverClose>
                          <Check
                            type="submit"
                            onClick={handleBadgeClick}
                            className="absolute bottom-2 right-0"
                          />
                        </PopoverClose>
                      </form>
                    </PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-100">
        {users.map((user) => {
          return (
            <MatchProfile
              key={user.id}
              user={user}
              open={profileOpen}
              handleOpenProfile={handleOpenProfile}
            />
          );
        })}
      </div>
    </FullHeightContainer>
  );
}
