import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import "./styles/loginForm.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { postForgetPassword } from "@/services/api/passwordApi";

interface props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ openDialog, setOpenDialog }: props) {
  const { login, status } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (username: string, password: string) => {
    if (await login(username, password)) setOpenDialog(false);
  };

  const forget_password = async (username: string) => {
    console.log(username);
    if (username !== "") {
      const response = await postForgetPassword(username);
      if (response.ok) {
        toast.success("Email envoyé");
        setOpenDialog(false);
      } else {
        toast.error("Problème de serveur, veuillez réessayer");
      }
    } else {
      toast.error("Login vide");
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Se connecter</Button>
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
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button type="button" onClick={() => forget_password(username)}>
          mot de passe oublié
        </Button>
        <Button type="button" onClick={() => handleSubmit(username, password)}>
          login
        </Button>
        <p>
          {" "}
          tu n'as pas de compte frero ?{" "}
          <DialogClose asChild>
            <Link type="button" to="/register">
              register
            </Link>
          </DialogClose>
        </p>
      </DialogContent>
    </Dialog>
  );
}
