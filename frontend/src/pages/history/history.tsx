import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { HistoryDto } from "@/dtos/history_dto";

import { UserDto } from "@/dtos/user_dto";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { kyGET } from "@/utils/ky/handlers";
import { useEffect, useState } from "react";
import { MatchCard } from "../matches/components/match-card";
import { MatchDto } from "@/dtos/match_dto";

export function History() {
  const { logout } = useAuth();
  const [usersWithDate, setUsersWithDate] = useState<
    ({ user: UserDto } & {
      date?: Date;
    })[]
  >([]);
  const [likers, setLikers] = useState<UserDto[]>([]);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [likesError, setLikeError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserFromHistory = async (_histories: HistoryDto[]) => {
      const userIds = _histories.map((history) => history.visitor_id);
      if (userIds.length === 0) {
        setHistoryError("Aucune vue de profil");
        return;
      }
      const usersIdsParam = userIds.join(",");
      const users = await kyGET<UserDto[]>(`users/${usersIdsParam}`, logout);
      if (users) {
        const usersWithDate = users.map((user) => {
          const history = _histories.find(
            (history) => history.visitor_id === user.id,
          );
          return {
            user,
            date: history?.date ? new Date(history.date) : undefined,
          };
        });
        setUsersWithDate(usersWithDate);
        setHistoryError(null);
      }
    };

    const fetchUserFromLikes = async (_likes: MatchDto[]) => {
      const userIds = _likes.map((history) => history.liker_id);
      if (userIds.length === 0) {
        setLikeError("Aucun like de profil");
        return;
      }
      const usersIdsParam = userIds.join(",");
      const users = await kyGET<UserDto[]>(`users/${usersIdsParam}`, logout);
      if (users) {
        setLikers(users);
        setLikeError(null);
      }
    };

    const fetchHistories = async () => {
      const histories: HistoryDto[] | null = await kyGET<HistoryDto[]>(
        "history",
        logout,
      );
      if (histories) {
        await fetchUserFromHistory(histories);
      }

      const likes: MatchDto[] | null = await kyGET<MatchDto[]>(
        "likeHistory",
        logout,
      );
      if (likes) {
        await fetchUserFromLikes(likes);
      }
    };

    fetchHistories();
  }, []);

  return (
    <FullHeightContainer className="flex flex-wrap gap-24 p-4">
      <div className=" flex-grow basis-80 gap-2">
        <h1 className="mb-4 text-2xl font-bold">Vues de votre profil</h1>
        {historyError && <span>{historyError}</span>}
        <div className="flex flex-wrap gap-2">
          {usersWithDate.map((userWithDate, index) => {
            return <MatchCard user={userWithDate.user} keyWord="viewhistory" />;
          })}
        </div>
      </div>
      <div className=" flex-grow basis-80 ">
        <h1 className="mb-4 text-2xl font-bold">Likes de votre profil</h1>
        {likesError && <span>{likesError}</span>}
        <div className="flex flex-wrap gap-2">
          {likers.map((user) => {
            return <MatchCard user={user} keyWord="likehistory" />;
          })}
        </div>
      </div>
    </FullHeightContainer>
  );
}
