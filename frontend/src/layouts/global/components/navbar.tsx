import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { Ban, History, MessageCircleHeart, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";
import { kyGET, kyPOST } from "@/utils/ky/handlers";
import { useChatChangesStore } from "@/stores/chat-changes-store";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/register/register";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function Navbar() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [chatUserIds, setChatUserIds] = useState<
    { userId: number; firstName: string }[]
  >([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { logout, status } = useAuth();
  const { changes, makeChanges } = useChatChangesStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleUnlike = async (userId: number) => {
    const response = await kyPOST(`matches/cancel/${userId}`, {}, logout);
    if (response) {
      setChatUserIds((chatUserIds) => {
        return chatUserIds.filter((chatUserId) => chatUserId.userId !== userId);
      });
      setSheetOpen(false);
      navigate("/");
    } else {
      toast.error("Error disliking user");
    }
  };

  useEffect(() => {
    const fetchChatUserIds = async () => {
      const chatUserIdsData = await kyGET<
        { userId: number; firstName: string }[] | { error: string }
      >("chat/chatUserIds", logout);
      if (!chatUserIdsData || (chatUserIdsData && "error" in chatUserIdsData)) {
        return;
      }
      setChatUserIds(chatUserIdsData);
    };

    setTimeout(() => fetchChatUserIds(), 200);
  }, [status, changes]);

  return (
    <>
      <header className="fixed flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-950 dark:text-gray-50 sm:px-6 md:px-8">
        <Link className="text-xl font-semibold" to="/">
          Matcha.
        </Link>
        <div className="flex items-center space-x-4">
          {status !== AuthStatus.Authenticated && (
            <>
              <Register />
              <Login openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </>
          )}
          <ToggleTheme />
          {status === AuthStatus.Authenticated && (
            <>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MessageCircleHeart className="h-6 w-6" />
                    <span className="sr-only">Bouton pour ouvrir le menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-2 p-4">
                    {chatUserIds.length === 0 && (
                      <span className="text-gray-900 dark:text-gray-50">
                        Aucun chat à afficher.
                      </span>
                    )}
                    {chatUserIds.map((chatUserId) => {
                      return (
                        <div className="flex" key={chatUserId.userId}>
                          <SheetClose asChild>
                            <Button
                              onClick={() => {
                                navigate(`/chat/${chatUserId.userId}`);
                                // Must have this to refresh the page
                                navigate(0);
                              }}
                              variant="outline"
                              className="w-full "
                            >
                              Chat avec {chatUserId.firstName}
                            </Button>
                          </SheetClose>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size={"icon"} variant={"outline"}>
                                <ThumbsDown size={20} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-lg">
                              <DialogTitle>
                                Voulez-vous disliker {chatUserId.firstName} ?
                              </DialogTitle>
                              <div className="flex gap-2">
                                <DialogClose asChild>
                                  <Button variant="secondary" className="grow">
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    className="grow"
                                    onClick={() =>
                                      handleUnlike(chatUserId.userId)
                                    }
                                  >
                                    Confirmer
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size={"icon"} variant={"outline"}>
                                <Ban size={20} className="text-destructive" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="rounded-lg">
                              <DialogTitle>
                                Voulez-vous bloquer {chatUserId.firstName} ?
                              </DialogTitle>
                              <div className="flex gap-2">
                                <DialogClose asChild>
                                  <Button variant="secondary" className="grow">
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    className="grow"
                                    onClick={async () => {
                                      await kyPOST(
                                        "block/" + chatUserId.userId,
                                        {},
                                        logout,
                                      );
                                      makeChanges();
                                      if (pathname.includes("/chat")) {
                                        navigate("/");
                                      }
                                      setSheetOpen(false);
                                    }}
                                  >
                                    Confirmer
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant={"ghost"} size={"icon"}>
                <Link to="/history">
                  <History />
                </Link>
              </Button>
              <Link
                className="items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:inline-flex"
                to="/logout"
              >
                Se déconnecter
              </Link>
            </>
          )}
        </div>
      </header>
      <div className="h-[64px]"></div>
    </>
  );
}
