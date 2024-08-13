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
    console.log(users)
  }, []);

  const handleToggleChange = (value: string) => {
    console.log(value);
    if (value !== "distance" && value !== "age" && value !== "fame_rating") {
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
        <ToggleGroup
          type="single"
          className="gap-4"
          onValueChange={handleToggleChange}
        >
          Tri :
          <ToggleGroupItem
            variant={"outline"}
            value="distance"
            aria-label="Toggle bold"
          >
            par distance
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            value="age"
            aria-label="Toggle italic"
          >
            par age
          </ToggleGroupItem>
          <ToggleGroupItem
            variant={"outline"}
            value="fame_rating"
            aria-label="Toggle underline"
          >
            par fame rating
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      <MatchSwiper users={users} />
    </FullHeightContainer>
  );
}
