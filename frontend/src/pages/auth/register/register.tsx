import Form from "./components/form";
import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
}from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react";

export default function Register() {

    const { register } = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (username: string, email: string, password: string) => {
        register(username, email, password)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Register</Button>
            </DialogTrigger>
            <DialogContent>
                <Input type="text" placeholder="login" name="username" value={username} onChange={(event) => setUsername(event.currentTarget.value)} className=""/> 
                <Input type="email" placeholder="email" name="email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} className=""/> 
                <Input type="password" placeholder="password" name="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
            <DialogClose asChild>
                <Button type="button" onClick={() => handleSubmit(username, email, password)}>
                    Register
                </Button>
            </DialogClose>
            </DialogContent>
        </Dialog>
    );
}