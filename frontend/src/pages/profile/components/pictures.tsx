import { Card } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import Picture from "./onePicture";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/stores/account-store";

export default function PicturesUser() {
    const [pictures, setPicture] = useState<string[]>([])
    const { account, setAccount } = useAccountStore()

    useEffect(() => {
        if(account && account.pictures)
            setPicture(account.pictures)
    }, [])

    useEffect(() => {
        if(account){
            account.pictures = pictures
            setAccount(account)
        }
    }, [pictures])

    return (
        <Card className="flex w-2/3 h-full">
            <CardContent className="flex flex-row flex-wrap h-full w-full gap-2">
                <Picture index={1} pictures={pictures ?? []} setPicture={setPicture}></Picture>
                <Picture index={2} pictures={pictures ?? []} setPicture={setPicture}></Picture>
                <Picture index={3} pictures={pictures ?? []} setPicture={setPicture}></Picture>
                <Picture index={4} pictures={pictures ?? []} setPicture={setPicture}></Picture>
                <Picture index={5} pictures={pictures ?? []} setPicture={setPicture}></Picture>
            </CardContent>
        </Card>
    )
}