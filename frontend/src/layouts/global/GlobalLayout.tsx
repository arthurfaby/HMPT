import Navbar from "./components/navbar/Navbar";
import {ReactNode} from 'react';
import Footer from './components/footer/Footer';

type GlobalLayoutProps = {
  children: ReactNode;
};

export default function GlobalLayout ({ children }: GlobalLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}