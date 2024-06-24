import { FullHeightContainer } from "@/components/utils/full-height-container";
import { useAuth } from "../../hooks/useAuth";
import { ProfilePicture } from "./components/profilPicture";
import { useEffect, useState } from "react";
import { postUser } from "@/services/api/userApi";
import User from "@/types/user";
import { NameUser } from "./components/nameUser";
import { Button } from "@/components/ui/button";
import AgeUser from "./components/ageUser";

export default function Profile() {

  const { account } = useAuth();
  
  const handleSubmit = async () => {
    try {
      if (account) {
        await postUser(account)
      }
    }
    catch {
      console.log("error serveur")
    }
  }

  
  return (
    <FullHeightContainer className="flex flex-col h-full items-center justify-center" dontScroll={false}>
        <ProfilePicture></ProfilePicture>
        <NameUser/>
        <AgeUser/>
        <Button type="submit" onClick={handleSubmit}> enregistrez </Button>
    </FullHeightContainer>
  );
}

