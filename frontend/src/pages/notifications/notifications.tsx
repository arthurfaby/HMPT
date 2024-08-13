import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSocket } from "@/stores/socket-store";
import { Bell } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Socket } from "socket.io-client";

export default function Notifications() {

  const { socket } = useSocket();

  const handleNotification = useCallback((data: any) => {
    console.log(data);
  }, []);

    useEffect(() => {
        socket.on("notification", handleNotification);
}, []);
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Bell/>
                </SheetTrigger>
                <SheetContent>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Notifications</h2>
                        <p className="text-gray-500">No notifications</p>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}