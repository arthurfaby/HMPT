import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/stores/account-store";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@radix-ui/react-slider";
import { Check, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function AgeUser() {
  const { account, setAccount } = useAccountStore();
  const [age, setAge] = useState<number>(account?.age ?? 0);
  const [localAge, setLocalAge] = useState<number>(account?.age ?? 0);

  useEffect(() => {
    if (age < 18) setAge(18);
    if (age < 18) setLocalAge(18);
    if (age > 150) setAge(150);
    if (age > 150) setLocalAge(150);
    if (account) {
      if (age < 18) {
        account.age = 18;
      } else if (age > 150) {
        account.age = 150;
      } else {
        account.age = age;
      }
      setAccount(account);
    }
  }, [age]);

  return (
    <div className="flex flex-row items-center gap-4">
      <h1 className="text-nowrap font-bold">Votre âge :</h1>
      <Input
        value={localAge}
        onChange={(e) => setLocalAge(+e.target.value)}
        onBlur={(e) => setAge(+e.target.value)}
        type="number"
        placeholder="Age"
      />
    </div>
  );
}
