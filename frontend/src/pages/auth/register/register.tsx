import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    setValidForm(
      username.length > 0 &&
        password.length > 0 &&
        email.length > 0 &&
        firstName.length > 0 &&
        lastName.length > 0,
    );
  }, [username, password, email, firstName, lastName]);

  useEffect(() => {
    const isLengthValid = password.length >= 8;
    const isUpperCaseValid = /[A-Z]/.test(password);
    const isLowerCaseValid = /[a-z]/.test(password);
    const isDigitValid = /[0-9]/.test(password);
    const isSymbolValid = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password,
    );
    if (
      isLengthValid &&
      isUpperCaseValid &&
      isLowerCaseValid &&
      isDigitValid &&
      isSymbolValid
    ) {
      setPasswordError(null);
    } else {
      setPasswordError(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      );
    }
  }, [password]);

  const handleSubmit = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const ok = await register(username, email, password, firstName, lastName);
    console.log(ok);
    if (ok) {
      setOpenDialog(false);
      toast.success("Un email de confirmation vous a été envoyé.");
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
        {passwordError && (
          <span className="text-xs text-red-500">{passwordError}</span>
        )}
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
        <Button
          disabled={!validForm}
          type="button"
          onClick={() =>
            handleSubmit(username, email, password, firstName, lastName)
          }
        >
          Register
        </Button>
      </DialogContent>
    </Dialog>
  );
}
