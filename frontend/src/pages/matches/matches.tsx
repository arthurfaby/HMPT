import { FullHeightContainer } from "@/components/utils/full-height-container";
import { UserDto } from "@/dtos/user_dto";
import { MatchSwiper } from "@/pages/matches/components/match-swiper";
import { useEffect, useState } from "react";
import { kyGET } from "@/utils/ky/handlers";
import { useAuth } from "@/hooks/useAuth";

export function Matches() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    kyGET<UserDto[]>("matches/usersToMatch", logout).then((users) => {
      setUsers(users ?? []);
    });
  }, []);

  return (
    <FullHeightContainer className="flex-center flex-col">
      <MatchSwiper users={users} />
    </FullHeightContainer>
  );
}
