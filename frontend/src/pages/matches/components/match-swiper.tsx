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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { kyPOST } from "@/utils/ky/handlers";
import { useAuth } from "@/hooks/useAuth";
import { MatchDto } from "@/dtos/match_dto";
import { useMatchStore } from "@/stores/matches-store";

type MatchSwiperProps = {
  users: UserDto[];
};

type SwipeState = "like" | "dislike";

export function MatchSwiper({ users }: MatchSwiperProps) {
  const [activeUser, setActiveUser] = useState(0);
  const [canSwipe, setCanSwipe] = useState(true);
  const { addMatch } = useMatchStore();
  const { logout } = useAuth();

  const fetchMatch = async (
    swipeState: SwipeState,
  ): Promise<MatchDto | { error: string }> => {
    if (swipeState === "like") {
      const match = await kyPOST<MatchDto, {}>(
        `matches/likeUser/${users[activeUser].id}`,
        {},
        logout,
      );
      if (!match) {
        return { error: "Erreur lors du like de l'utilisateur" };
      }
      return match;
    }
    return { error: "Dislike non implenté" };
  };

  const handleSwipe = async (swipeState: SwipeState) => {
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
        toast.success("ITS A MATCH !", {
          position: "top-center",
        });
        addMatch();
      } else {
        toast.success("Utilisateur liké", {
          position: "top-center",
        });
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

  const handleReport = () => {};
  if (users.length === 0) {
    return (
      <span className="text-xl font-bold text-primary">
        Aucun utilisateur à afficher.
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
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" onClick={handleReport} variant="outline">
              <Flag className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-lg">
            <DialogTitle>
              Confirmez-vous que {users[activeUser].first_name} est un faux
              compte ?
            </DialogTitle>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="secondary" className="grow">
                  Annuler
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="grow">Confirmer</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
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
