import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
}from "@/components/ui/dialog"
import "./styles/loginForm.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";



export default function Login() {

    const {login, status} = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (username: string, password: string) => {
       login(username, password)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sign in</Button>
            </DialogTrigger>
            <DialogContent>
                <Input type="text" placeholder="login" name="username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} className=""/> 
                <Input type="password" placeholder="password" name="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
            <DialogClose asChild>
                <Button type="button" onClick={() => handleSubmit(username, password)}>
                    login 
                </Button>
            </DialogClose>
            <p> tu n'as pas de compte frero ?{" "}
                <DialogClose asChild>
                    <Link type="button" to="/register">
                        register
                    </Link>
                </DialogClose>
            </p>
            </DialogContent>
        </Dialog>
    )
}