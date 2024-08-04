import { FullHeightContainer } from "@/components/utils/full-height-container";
import { useAuth } from "../../hooks/useAuth";
import { ProfilePicture } from "./components/profilPicture";
import { useEffect, useState } from "react";
import { postUser } from "@/services/api/userApi";
import User from "@/types/user";
import { NameUser } from "./components/nameUser";
import { Button } from "@/components/ui/button";
import AgeUser from "./components/ageUser";
import Gender from "./components/gender";
import PreferenceSexual from "./components/preferenceSexual";
import Biography from "./components/biography";
import Interest from "./components/interest";
import PicturesUser from "./components/pictures";

export default function Profile() {

  const { account } = useAuth();
  console.log("profile")
  
  const handleSubmit = async () => {
    try {
      if (account) {
        console.log(account)
        await postUser(account)
      }
    }
    catch {
      console.log("error serveur")
    }
  }

  
  return (
    <FullHeightContainer className="flex flex-col h-full items-center justify-center gap-10" dontScroll={false}>
        <ProfilePicture/>
        <NameUser/>
        <AgeUser/>
        <Gender/>
        <PreferenceSexual/>
        <Biography/> 
        <Interest/>
        <PicturesUser/>
        <Button type="submit" onClick={handleSubmit}> enregistrez </Button>
    </FullHeightContainer>
  );
}

