import { useState, FormEvent, useEffect } from "react";
import { getUser, postLogin } from "../../../../services/api/authApi";
import User from "../../../../types/user";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginForm.css";
import { AuthStatus, useAuth } from "../../../../hooks/useAuth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { status, login, Authenticate } = useAuth();
  useEffect(() => {
    Authenticate();
    if (status === AuthStatus.Authenticated) {
      navigate("/");
    }
  }, [status, navigate]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password);
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="login"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            login
          </button>
        </div>
        <div className="link-register">
          <p>
            Don't have an account ?<Link to="/register"> Register</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
