import { useState, FormEvent } from "react"; 
import { getUser, postLogin } from "../../../../services/api/authApi";
import User from "../../../../types/user";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginForm.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            username,
            password
        }
        console.log("user :", user)
        const response = await postLogin(user)
        if (response.ok) {
           navigate('/profile') 
        }
        else {
            console.log("error")
        }
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="login" name="username" value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="password" name="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                </div>
                <div>
                    <button type="submit" className="btn">login</button>
                </div>
                <div className="link-register">
                    <p>Don't have an account ?
                    <Link to='/register'> Register</Link> </p>
                </div>
            </form>
        </div>
        );
}