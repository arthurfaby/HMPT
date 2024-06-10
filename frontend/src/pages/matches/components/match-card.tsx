import { UserDto } from "@/dtos/user_dto";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { MatchProfile } from "@/pages/matches/components/match-profile";
import { Badge } from "@/components/ui/badge";

export type MatchCardProps = {
  user: UserDto;
  nextUser?: UserDto;
};

export function MatchCard({ user, nextUser }: MatchCardProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const handleOpenProfile = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <>
      {nextUser ? (
        <div
          style={{
            backgroundImage: `url(${nextUser.pictures[0]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={handleOpenProfile}
          className="absolute min-w-72 cursor-pointer rounded-2xl p-4 transition-all"
        >
          <div className="absolute left-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-secondary to-transparent to-transparent to-50%"></div>
          <AspectRatio
            ratio={2 / 3}
            className="flex flex-col justify-end gap-2"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-bold">{nextUser.first_name}</span>
              <span className="text-md">{nextUser.age}</span>
            </div>
            <span>{nextUser.biography.substring(0, 25) + "..."}</span>
            <div className="flex flex-wrap gap-1">
              {nextUser.interests.map((interest) => {
                return <Badge key={nextUser.id + interest}>{interest}</Badge>;
              })}
            </div>
          </AspectRatio>
        </div>
      ) : null}
      <div
        style={{
          backgroundImage: `url(${user.pictures[0]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
        onClick={handleOpenProfile}
        className="top-0 min-w-72 cursor-pointer rounded-2xl p-4 "
      >
        <div className="absolute left-0 top-0 h-full w-full rounded-2xl bg-gradient-to-t from-secondary to-transparent to-transparent to-50%"></div>
        <AspectRatio ratio={2 / 3} className="flex flex-col justify-end gap-2">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold">{user.first_name}</span>
            <span className="text-md">{user.age}</span>
          </div>
          <span>{user.biography.substring(0, 25) + "..."}</span>
          <div className="flex flex-wrap gap-1">
            {user.interests.map((interest) => {
              return <Badge key={user.id + interest}>{interest}</Badge>;
            })}
          </div>
        </AspectRatio>
      </div>
      <MatchProfile
        user={user}
        open={profileOpen}
        handleOpenProfile={handleOpenProfile}
      />
    </>
  );
}
