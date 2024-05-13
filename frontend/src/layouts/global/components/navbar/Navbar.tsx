import { useEffect, useState } from "react";
import { COLORS } from "../../../../utils/colors/colors";
import Button from "../../../../utils/components/button/Button";
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const nav = document.querySelector("nav");

    if (isMobile) {
      nav?.classList.add("mobile");
    } else {
      nav?.classList.remove("mobile");
    }
  }, [isMobile]);

  useEffect(() => {
    const burger = document.querySelector(".burger");

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    burger?.addEventListener("click", toggleMenu);
    return () => burger?.removeEventListener("click", toggleMenu);
  }, [isMenuOpen]);

  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");

    if (isMenuOpen) {
      nav?.classList.add("open");
      burger?.classList.add("open");
    } else {
      nav?.classList.remove("open");
      burger?.classList.remove("open");
    }
  }, [isMenuOpen]);

  return (
    <header>
      <div className="mobile-top-bar">
        <div className="logo-mobile">
          <h1 className="nav-logo">
            Matcha<span>.</span>
          </h1>
        </div>
        <div className="burger">
          <div className="burger-bar top"></div>
          <div className="burger-bar middle"></div>
          <div className="burger-bar bottom"></div>
        </div>
      </div>
      <nav>
        <div>
          <a className="nav-logo" href="/">
            Matcha<span>.</span>
          </a>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="nav-buttons">
          <Button link="/register" backgroundColor={COLORS.primary}>
            Sign up
          </Button>
          <Button backgroundColor={COLORS.secondary}>Sign in</Button>
        </div>
      </nav>
      <div className="under-navbar"></div>
    </header>
  );
};

export default Navbar;
