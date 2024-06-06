import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/register/register";

export function Navbar() {


  return (
      <>
      <header className="flex fixed items-center w-full justify-between px-4 py-3 bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50 sm:px-6 md:px-8">
        <Link className="text-xl font-semibold" to="/">
          Matcha.
        </Link>
        <div className="flex items-center space-x-4">
          <Register/>
          <Login
          />
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
                <Register/>
                <Login
                />
                <ToggleTheme />
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
