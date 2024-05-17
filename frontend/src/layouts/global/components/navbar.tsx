import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function Navbar() {
  const { status } = useAuth();

  return (
    <>
      <header className="fixed flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-gray-950 dark:text-gray-50 sm:px-6 md:px-8">
        <Link className="text-xl font-semibold" to="/">
          Matcha.
        </Link>
        <div className="flex items-center space-x-4">
          {status === AuthStatus.Authenticated ? (
            <Link
              className="hidden items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:inline-flex"
              to="/logout"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                className="hidden items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:inline-flex"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="hidden items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 sm:inline-flex"
                to="/login"
              >
                Login
              </Link>
            </>
          )}
          <ToggleTheme />
          <Sheet>
            <SheetTrigger asChild>
              <Button className="sm:hidden" size="icon" variant="ghost">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                {status === AuthStatus.Authenticated ? (
                  <SheetClose asChild>
                    <Link
                      className="items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:inline-flex"
                      to="/logout"
                    >
                      Logout
                    </Link>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link
                        className="items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 sm:inline-flex"
                        to="/register"
                      >
                        Register
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        className="items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 sm:inline-flex"
                        to="/login"
                      >
                        Login
                      </Link>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="h-[64px]"></div>
    </>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
