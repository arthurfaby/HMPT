import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getNotifications } from "@/services/api/notificationsApi";
import { useSocket } from "@/stores/socket-store";
import { CardContent } from "@mui/material";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Notifications() {

  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<any[]>([]);


    useEffect(() => {
        const handleNotification = (notification: any) => {
            setNotifications([...notifications, notification]);
        }
        const handleReadFromChat = (index: number) => {
            console.log(index)
        const newNotifications = [...notifications];
        newNotifications.map((notification) => {
            if(notification.chat_id && notification.chat_id == index)
                notification.seen = true
        })
        setNotifications(newNotifications);
        }
        socket.on("notification", handleNotification);
        socket.on("read", handleReadFromChat)
        return  () => {
            socket.off("notification", handleNotification);
            socket.off("read", handleReadFromChat);
        }
    }, [notifications]);

    useEffect(() => {
        const fillNotifications = async () => {
            try {
                const fillNotifications: any = await getNotifications()
                setNotifications(fillNotifications)
            }
            catch (e) {
                console.log(e)
            }   
        }
        fillNotifications();
    }, []);

    const handleRead = useCallback((index: number) => {
        const newNotifications = [...notifications];
        newNotifications[index].seen = true;
        setNotifications(newNotifications);
        socket.emit("read", {id: newNotifications[index].id});
    }, [notifications]);

    

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Bell className="h-6 w-6" />
                    <span className="sr-only">Bouton pour ouvrir le menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Notifications</h2>
                        {notifications.length === 0 ? <p>No notifications</p> 
                            :
                        (notifications.map((notification, index) => (
                            <Card key={index} className={notification.seen ? "bg-background" : "bg-secondary"} onClick={() => handleRead(index)}>
                                <CardContent>
                                    <p>{notification.message}</p>
                                    <p>{notification.date}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="relative">
                 <Badge className="absolute bottom-6 left-6 rounded-full">
                    {notifications.filter((notification) => !notification.seen).length}
                </Badge>
            </div>
            
        </div>
    )
}