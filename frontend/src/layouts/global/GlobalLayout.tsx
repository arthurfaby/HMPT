import Navbar from "./components/navbar/Navbar";
import {ReactNode} from 'react';
import Footer from './components/footer/Footer';
import {Outlet} from "react-router-dom";

export default function GlobalLayout () {
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