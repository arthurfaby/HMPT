import { UserDto } from "@/dtos/user_dto";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { getGenderTaxo } from "@/utils/taxonomy";
import { useAuth } from "@/hooks/useAuth";
import { formatDistance } from "@/utils/formatDistance";
import { kyGET, kyPOST } from "@/utils/ky/handlers";
import { Card } from "@/components/ui/card";

export type MatchProfileProps = {
  user: UserDto;
  open: boolean;
  handleOpenProfile: () => void;
};

export function MatchProfile({
  user,
  open,
  handleOpenProfile,
}: MatchProfileProps) {
  const [fullImage, setFullImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { logout } = useAuth();
  const [distanceMeters, setDistanceMeters] = useState(-1);
  const [distanceString, setDistanceString] = useState("Loading...");

  const getDistance = async () => {
    const response = await kyGET<{ distance: number }>(
      `users/distance/${user.id}`,
      logout,
    );
    if (response) {
      setDistanceMeters(response.distance);
    } else {
      setDistanceString("Erreur lors du chargement de la distance");
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getDistance();
  }, [user]);

  useEffect(() => {
    if (distanceMeters === -1) {
      setDistanceString("Loading...");
    } else {
      setDistanceString(formatDistance(distanceMeters));
    }
  }, [distanceMeters]);

  const handleNextImage = () => {
    setImageIndex(imageIndex + 1);
  };
  const handlePreviousImage = () => {
    setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    const seeProfile = async () => {
      await kyPOST<UserDto, {}>(`history/seeProfile/${user.id}`, {}, logout);
    };

    if (open) {
      seeProfile();
    }
  }, [open]);

  const handleOpenChange = () => {
    handleOpenProfile();
    setFullImage(false);
    setImageIndex(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[400px]
         rounded-lg border-0 p-0"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={
            "absolute w-full rounded-lg p-4 transition-all" +
            (fullImage ? " h-full" : " h-[400px]")
          }
        >
          <img
            className="center absolute left-0 top-0 h-full w-full rounded-lg object-cover"
            src={user.pictures[imageIndex]}
            alt="Profile picture"
          />
          {user.online ? (
            <Badge variant="success" className="absolute">
              En ligne
            </Badge>
          ) : (
            <Badge variant="destructive" className="absolute">
              Hors ligne depuis le : {user.last_online_date.split("T")[0]}
            </Badge>
          )}
          {fullImage ? (
            <>
              {imageIndex !== 0 ? (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute left-4 top-[50%] rounded-full"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft />
                </Button>
              ) : null}
              {imageIndex !== user.pictures.length - 1 ? (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-[50%] rounded-full"
                  onClick={handleNextImage}
                >
                  <ChevronRight />
                </Button>
              ) : null}
            </>
          ) : null}
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-[-20px] right-[20px] rounded-full"
            onClick={() => {
              setFullImage(!fullImage);
            }}
          >
            <ChevronDown
              className="transition-all "
              style={{
                rotate: fullImage ? "180deg" : "",
              }}
            />
          </Button>
        </div>
        <div className="flex flex-col p-4 pt-[430px]">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold">{user.first_name}</span>
                <span>{user.age}</span>
                <span>({getGenderTaxo(user.gender)})</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <MapPin size={20} />
                <span>{distanceString}</span>
              </div>
              <div>
                {user.fame_rating > 4 ? (
                  <Badge variant="success">{user.fame_rating} / 5</Badge>
                ) : user.fame_rating > 2.5 ? (
                  <Badge variant="warning">{user.fame_rating} / 5</Badge>
                ) : (
                  <Badge variant="destructive">{user.fame_rating} / 5</Badge>
                )}
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2.5">
            <span className="text-xl font-bold">À propos</span>
            <span>{user.biography}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2.5">
            <span className="text-xl font-bold">Centre d'intérêts</span>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => {
                return (
                  <Badge key={user.id + interest} variant="outline">
                    {interest}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
