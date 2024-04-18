import { Link, Navigator, useNavigate } from "react-router-dom";
import { COLORS } from "../../colors/colors";
import "./Button.css";

type ButtonProps = {
  backgroundColor?: string;
  color?: string;
  link?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({
  children,
  backgroundColor = COLORS.primary,
  color = COLORS.white,
  link,
  onClick,
}: ButtonProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      window.location.href = link;
    }
  };

  const buttonStyle = {
    backgroundColor,
    color,
    boxShadow: `0px 2px 6px ${backgroundColor}80`,
  };
  return (
    <button className="button" style={buttonStyle} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
