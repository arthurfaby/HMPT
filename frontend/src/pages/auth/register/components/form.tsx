import {useState, FormEvent } from "react";
// import "./form.css"
import postRegister from "../../../../services/api/registerApi";

export default function Form() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            username,
            email,
            password
        }
        console.log("user :", user)
        postRegister(user)
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
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={username} onChange={onChangeUsername}/>
            <input type="email" name="email" value={email} onChange={onChangeEmail}/>
            <input type="password" name="password" value={password} onChange={onChangePassword}/>
            <input type="submit"/>
        </form>
    );
}