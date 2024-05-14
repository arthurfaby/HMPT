import { Outlet } from "react-router-dom";
import { Navbar } from "@/layouts/global/components/navbar";
import { Footer } from "@/layouts/global/components/footer";

export default function GlobalLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
