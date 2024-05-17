import { useEffect, useState } from "react";
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
import { animateValue } from "@/utils/animateValue";
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

const MAX_TRANSLATE_VALUE = 400;

export function MatchSwiper({ users }: MatchSwiperProps) {
  const [activeUser, setActiveUser] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [canSwipe, setCanSwipe] = useState(true);

  useEffect(() => {
    setTranslateValue(0);
  }, [activeUser]);

  useEffect(() => {
    if (translateValue === 0) {
      setOpacity(1);
      return;
    }
    setOpacity(
      (MAX_TRANSLATE_VALUE - Math.abs(translateValue)) / MAX_TRANSLATE_VALUE -
        0.1,
    );
  }, [translateValue]);

  const handleSwipeRight = () => {
    if (!canSwipe) {
      toast.error("Veuillez attendre avant de swipe à nouveau.", {
        position: "top-center",
      });
      return;
    }
    setCanSwipe(false);
    animateValue(
      0,
      MAX_TRANSLATE_VALUE,
      (value) => {
        setTranslateValue(value);
      },
      () => {
        if (users[activeUser + 1]) {
          setActiveUser(activeUser + 1);
        } else {
          setActiveUser(0);
        }
        setCanSwipe(true);
      },
      300,
      [0.07, 0.86, 0.43, 0.98],
    );
  };

  const handleSwipeLeft = () => {
    if (!canSwipe) {
      toast.error("Veuillez attendre avant de swipe à nouveau.", {
        position: "top-center",
      });
      return;
    }
    setCanSwipe(false);
    animateValue(
      0,
      MAX_TRANSLATE_VALUE,
      (value) => {
        setTranslateValue(-value);
      },
      () => {
        if (users[activeUser - 1]) {
          setActiveUser(activeUser - 1);
        } else {
          setActiveUser(users.length - 1);
        }
        setCanSwipe(true);
      },
      300,
      [0.07, 0.86, 0.43, 0.98],
    );
  };

  const handleReport = () => {};

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <MatchCard
          translateValue={translateValue}
          opacity={opacity}
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
                onClick={handleSwipeLeft}
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
              <Button size="icon" onClick={handleSwipeRight} variant="success">
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
