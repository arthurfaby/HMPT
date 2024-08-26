import { FullHeightContainer } from "@/components/utils/full-height-container";
import { UserDto } from "@/dtos/user_dto";
import { MatchSwiper } from "@/pages/matches/components/match-swiper";
import { useEffect, useState } from "react";
import { kyGET } from "@/utils/ky/handlers";
import { useAuth } from "@/hooks/useAuth";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Matches() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    kyGET<UserDto[]>("matches/usersToMatch", logout).then((users) => {
      setUsers(users ?? []);
    });
  }, []);

  const handleToggleChange = (value: string) => {
    if (
      value !== "distance_asc" &&
      value !== "age_asc" &&
      value !== "fame_rating_asc" &&
      value !== "distance_desc" &&
      value !== "age_desc" &&
      value !== "fame_rating_desc" &&
      value !== "common_tags_desc" &&
      value !== "common_tags_asc"
    ) {
      kyGET<UserDto[]>("matches/usersToMatch", logout).then((users) => {
        setUsers(users ?? []);
      });
    } else {
      kyGET<UserDto[]>("matches/usersToMatch/" + value, logout).then(
        (users) => {
          setUsers(users ?? []);
        },
      );
    }
  };

  return (
    <FullHeightContainer className="flex-center flex-col gap-10">
      {users.length > 0 && (
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
      <MatchSwiper users={users} />
    </FullHeightContainer>
  );
}
