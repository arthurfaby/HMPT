import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flag, Heart, X } from "lucide-react";
import { UserDto } from "@/dtos/user_dto";
import { MatchCard } from "@/pages/matches/components/match-card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { kyPOST } from "@/utils/ky/handlers";
import { useAuth } from "@/hooks/useAuth";
import { MatchDto } from "@/dtos/match_dto";
import { useMatchStore } from "@/stores/matches-store";
import { ReportDto } from "@/dtos/report_dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MatchSwiperProps = {
  users: UserDto[];
};

type SwipeState = "like" | "dislike";

export function MatchSwiper({ users }: MatchSwiperProps) {
  const [activeUser, setActiveUser] = useState(0);
  const [canSwipe, setCanSwipe] = useState(true);
  const { addMatch } = useMatchStore();
  const { logout } = useAuth();

  const reportUser = async () => {
    if (!canSwipe) {
      toast.error("Veuillez attendre avant de swipe à nouveau.", {
        position: "top-center",
      });
      return;
    }
    setCanSwipe(false);
    const report = await kyPOST<ReportDto, {}>(
      `report/${users[activeUser].id}`,
      {},
      logout,
    );
    if (!report) {
      toast.error("Erreur lors du signalement de l'utilisateur", {
        position: "top-center",
      });
      setCanSwipe(true);
    } else {
      users.splice(activeUser, 1);
      if (users[activeUser]) {
        setActiveUser(activeUser);
      } else {
        setActiveUser(0);
      }
      setCanSwipe(true);
      toast.success("Utilisateur signalé", {
        position: "top-center",
      });
    }
  };

  const fetchMatch = async (
    swipeState: SwipeState,
  ): Promise<MatchDto | { error: string }> => {
    if (swipeState === "like") {
      // Like
      const match = await kyPOST<MatchDto, {}>(
        `matches/likeUser/${users[activeUser].id}`,
        {},
        logout,
      );
      if (!match) {
        return { error: "Erreur lors du like de l'utilisateur" };
      }
      return match;
    } else {
      // Dislike
      const match = await kyPOST<MatchDto, {}>(
        `matches/dislikeUser/${users[activeUser].id}`,
        {},
        logout,
      );
      if (!match) {
        return { error: "Erreur lors du dislike de l'utilisateur" };
      }
      return match;
    }
  };

  const handleSwipe = async (
    swipeState: SwipeState,
    printToast: boolean = true,
  ) => {
    if (!canSwipe) {
      toast.error("Veuillez attendre avant de swipe à nouveau.", {
        position: "top-center",
      });
      return;
    }
    setCanSwipe(false);
    //TODO: Add logic to swipe
    const data = await fetchMatch(swipeState);
    if ("error" in data) {
      toast.error(data.error, {
        position: "top-center",
      });
      setCanSwipe(true);
      return;
    } else {
      // If chat_id is present, it means a chat has been created
      // So the user has been matched
      if (data.chat_id) {
        if (printToast) {
          toast.success("ITS A MATCH !", {
            position: "top-center",
          });
        }
        addMatch();
      } else if (swipeState === "like") {
        if (printToast) {
          toast.success("Utilisateur liké", {
            position: "top-center",
          });
        }
      } else {
        if (printToast) {
          toast.success("Utilisateur disliké", {
            position: "top-center",
          });
        }
      }

      // Remove the user from the list
      users.splice(activeUser, 1);
      if (users[activeUser]) {
        setActiveUser(activeUser);
      } else {
        setActiveUser(0);
      }
      setCanSwipe(true);
    }
  };

  if (users.length === 0) {
    return (
      <span className="text-xl font-bold text-primary">
        Aucun utilisateur ne correspond à vos critères.
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <MatchCard
          user={users[activeUser]}
          nextUser={
            activeUser != users.length - 1 ? users[activeUser + 1] : users[0]
          }
        />
      </div>
      <div className="flex w-full justify-around">
        <Button
          size="icon"
          onClick={() => {
            handleSwipe("dislike");
          }}
          variant="destructive"
        >
          <X />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <Flag className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={reportUser}>Signaler</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="icon"
          onClick={() => {
            handleSwipe("like");
          }}
          variant="success"
        >
          <Heart />
        </Button>
      </div>
    </div>
  );
}
