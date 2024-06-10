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

type MatchSwiperProps = {
  users: UserDto[];
};

type SwipeState = "like" | "dislike";

export function MatchSwiper({ users }: MatchSwiperProps) {
  const [activeUser, setActiveUser] = useState(0);
  const [canSwipe, setCanSwipe] = useState(true);

  const handleSwipe = (swipeState: SwipeState) => {
    if (!canSwipe) {
      toast.error("Veuillez attendre avant de swipe à nouveau.", {
        position: "top-center",
      });
      return;
    }
    setCanSwipe(false);
    //TODO: Add logic to swipe
    if (users[activeUser + 1]) {
      setActiveUser(activeUser + 1);
    } else {
      setActiveUser(0);
    }
    setCanSwipe(true);
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => {
                  handleSwipe("dislike");
                }}
                variant="destructive"
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Ne pas liker {users[activeUser].first_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" onClick={handleReport} variant="outline">
                    <Flag className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-lg">
                  <DialogTitle>
                    Confirmez-vous que {users[activeUser].first_name} est un
                    faux compte ?
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
            </TooltipTrigger>
            <TooltipContent>
              Signaler {users[activeUser].first_name} comme faux compte
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => {
                  handleSwipe("like");
                }}
                variant="success"
              >
                <Heart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Liker {users[activeUser].first_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
