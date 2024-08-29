import { Textarea } from "@/components/ui/textarea";
import { useAccountStore } from "@/stores/account-store";
import { useEffect, useState } from "react";

export default function Biography() {
  const { account, setAccount } = useAccountStore();
  const [biography, setBiography] = useState(account?.biography ?? "");

  useEffect(() => {
    if (!account) return;
    account.biography = biography.substring(0, 142);
    setAccount(account);
  }, [biography]);

  return (
    <div className="flex h-full w-full max-w-[600px]">
      <Textarea
        rows={7}
        maxLength={142}
        className="resize-none"
        placeholder="parle-nous de toi !"
        value={biography}
        onChange={(e) => {
          setBiography(e.currentTarget.value);
        }}
      ></Textarea>
    </div>
  );
}
