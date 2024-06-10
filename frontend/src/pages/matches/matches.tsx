import { FullHeightContainer } from "@/components/utils/full-height-container";
import { UserDto } from "@/dtos/user_dto";
import { MatchSwiper } from "@/pages/matches/components/match-swiper";
import { useEffect, useState } from "react";
import { getUsersToMatch } from "@/services/api/users/getUsers";
export function Matches() {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    getUsersToMatch().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <FullHeightContainer className="flex-center flex-col">
      <MatchSwiper users={users} />
    </FullHeightContainer>
  );
}
