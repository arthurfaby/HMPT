import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const { status } = useAuth();
  return (
    <div>
      <h1>Profil</h1>
    </div>
  );
}
