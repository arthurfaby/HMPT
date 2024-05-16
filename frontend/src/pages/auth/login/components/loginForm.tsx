import { useState, FormEvent, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { AuthStatus, useAuth } from "../../../../hooks/useAuth";
import { Input } from "@/components/ui/input";

type Props = {
    className: string
}

export default function LoginForm({className}: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {status, login, Authenticate} = useAuth()
    console.log(status)
    useEffect(() => {
        Authenticate()
        if (status === AuthStatus.Authenticated) {
            navigate('/home');
        }
    }, [status, navigate]);
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(username, password)
    }
    return (
            <form onSubmit={handleSubmit} className={"flex flex-col gap-5 p-4 " + className }>
                <h1 className="text-center">Login</h1>
                    <Input type="text" placeholder="login" name="username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} className=""/> 
                    <Input type="password" placeholder="password" name="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                    <button type="submit" className="btn">login</button>
            </form>
        );
}