import {useState, FormEvent, useEffect} from "react";
import postRegister from "../../../../services/api/registerApi";
import { useNavigate} from "react-router-dom";
import "../../login/styles/loginForm.css";
import { useAuth, AuthStatus } from "../../../../hooks/useAuth";

export default function Form() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {Authenticate, status} = useAuth()
    useEffect(() => {
        Authenticate()
        if (status === AuthStatus.Authenticated) {
            navigate('/home');
        }
    }, [status, navigate]);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            username,
            email,
            password
        }
        console.log("user :", user)
        const response = await postRegister(user)
        if (response.ok)
        {
            console.log("response :", response)
            navigate("/login")
        }
    }

    const onChangeUsername = (event: FormEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value)
    }

    const onChangeEmail = (event: FormEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    const onChangePassword = (event: FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    return (
    <div className="wrapper">
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
                <input type="text" name="username" placeholder='username' value={username} onChange={onChangeUsername}/>
            </div>
            <div className="input-box">
                <input type="email" name="email" placeholder="email" value={email} onChange={onChangeEmail}/>
            </div>
            <div className="input-box">
                <input type="password" name="password" placeholder="password" value={password} onChange={onChangePassword}/>
            </div>
            <input type="submit" className="btn"/>
        </form>
    </div>
    );
}