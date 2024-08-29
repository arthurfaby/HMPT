import { FullHeightContainer } from "@/components/utils/full-height-container";
import { useAuth } from "../../hooks/useAuth";
import { ProfilePicture } from "./components/profilPicture";
import { postUser } from "@/services/api/userApi";
import { NameUser } from "./components/nameUser";
import { Button } from "@/components/ui/button";
import AgeUser from "./components/ageUser";
import Gender from "./components/gender";
import PreferenceSexual from "./components/preferenceSexual";
import Biography from "./components/biography";
import Interest from "./components/interest";
import PicturesUser from "./components/pictures";
import { toast } from "sonner";
import { GPSPosition } from "./components/gpsPosition";
import Username from "./components/username";
import Email from "./components/email";
import Password from "./components/password";

export default function Profile() {
  const { account } = useAuth();

  const handleSubmit = async () => {
    try {
      if (account) {
        await postUser(account);
        toast.success("Votre profil a bien été enregistré");
      }
    } catch {}
  };

  return (
    <FullHeightContainer
      className="flex h-full flex-col items-center justify-center gap-10"
      dontScroll={false}
    >
      <ProfilePicture />
      <Username />
      <Email />
      <Password />
      <NameUser />
      <AgeUser />
      <GPSPosition />
      <Gender />
      <PreferenceSexual />
      <Biography />
      <Interest />
      <PicturesUser />
      <Button type="submit" onClick={handleSubmit}>
        Enregistrer
      </Button>
    </FullHeightContainer>
  );
}
