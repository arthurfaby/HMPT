import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import "./styles/loginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { postForgetPassword } from "@/services/api/passwordApi";
import { DialogTitle } from "@radix-ui/react-dialog";

interface props {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ openDialog, setOpenDialog }: props) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (username: string, password: string) => {
    if (await login(username, password)) {
      setOpenDialog(false);
      navigate(0);
    } else {
      toast.error("le nom d'utilisateur et/ou le mot de passe sont incorrects");
    }
  };

  const forget_password = async (username: string) => {
    if (username !== "") {
      try {
        const response = await postForgetPassword(username);
        if ("error" in response) {
          toast.error(response.error as string);
        } else {
          toast.success("Email envoyé");
          setOpenDialog(false);
        }
      } catch (e) {}
    } else {
      toast.error("Login vide");
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
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
