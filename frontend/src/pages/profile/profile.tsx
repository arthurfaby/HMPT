import { FullHeightContainer } from "@/components/utils/full-height-container";
import { useAuth } from "../../hooks/useAuth";
import { ProfilePicture } from "./components/profilPicture";
import { useState } from "react";

export default function Profile() {

  const { account } = useAuth();
  const [profilPicture, setProfilPicture] = useState<string>(account?.profil_picture ?? "")

  return (
    <FullHeightContainer className="flex flex-col h-full items-center justify-center" dontScroll={true}>
        <ProfilePicture></ProfilePicture>
    </FullHeightContainer>
  );
}
