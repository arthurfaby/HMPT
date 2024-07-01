import { Card } from "@/components/ui/card";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { HistoryDto } from "@/dtos/history_dto";

import { UserDto } from "@/dtos/user_dto";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { kyGET } from "@/utils/ky/handlers";
import { useEffect, useState } from "react";
import { MatchProfile } from "../matches/components/match-profile";

export function History() {
  const { logout } = useAuth();
  const [usersWithDate, setUsersWithDate] = useState<
    ({ user: UserDto } & {
      date?: Date;
    })[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (_histories: HistoryDto[]) => {
      const userIds = _histories.map((history) => history.visited_id);
      if (userIds.length === 0) {
        setError("Aucune vue de profil");
        return;
      }
      const usersIdsParam = userIds.join(",");
      const users = await kyGET<UserDto[]>(`users/${usersIdsParam}`, logout);
      if (users) {
        const usersWithDate = users.map((user) => {
          const history = _histories.find(
            (history) => history.visited_id == user.id,
          );
          return {
            user,
            date: history?.date ? new Date(history.date) : undefined,
          };
        });
        setUsersWithDate(usersWithDate);
        setError(null);
      }
    };

    const fetchHistories = async () => {
      const histories: HistoryDto[] | null = await kyGET<HistoryDto[]>(
        "history",
        logout,
      );
      if (histories) {
        await fetchUsers(histories);
      }
    };

    fetchHistories();
  }, []);

  return (
    <FullHeightContainer className="p-4">
      <div className="m-auto w-full max-w-4xl ">
        <h1 className="mb-4 text-2xl font-bold">Vues de votre profil</h1>
        {error && <span>{error}</span>}
        {usersWithDate.map((userWithDate, index) => {
          return (
            <Card
              className={cn("flex justify-between p-4", {
                "mb-4": index !== usersWithDate.length - 1,
              })}
            >
              <span className="text-xl font-bold">
                {userWithDate.user.first_name}
              </span>
              <span className="text-lg">
                {userWithDate.date?.toLocaleDateString("fr")}
              </span>
            </Card>
          );
        })}
      </div>
    </FullHeightContainer>
  );
}
