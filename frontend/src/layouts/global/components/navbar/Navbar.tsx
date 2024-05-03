import { COLORS } from "../../../../utils/colors/colors";
import Button from "../../../../utils/components/button/Button";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div>
          <a className="nav-logo" href="/">
            Matcha<span>.</span>
          </a>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
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
