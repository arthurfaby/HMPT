import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    register(username, email, password, firstName, lastName);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer un compte</Button>
      </DialogTrigger>
      <DialogContent>
        <Input
          type="text"
          placeholder="login"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          className=""
        />
        <Input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          className=""
        />
        <Input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Input
          type="text"
          placeholder="Prénom"
          name="first_name"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
          className=""
        />
        <Input
          type="text"
          placeholder="Nom"
          name="last_name"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          className=""
        />
        <DialogClose asChild>
          <Button
            type="button"
            onClick={() =>
              handleSubmit(username, email, password, firstName, lastName)
            }
          >
            Register
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
