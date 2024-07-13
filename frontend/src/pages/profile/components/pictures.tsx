import { Card } from "@/components/ui/card";
import { CardContent } from "@mui/material";
import Picture from "./onePicture";
import { useState } from "react";

export default function PicturesUser() {
    const [pictures, setPicture] = useState<string[]>([])
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