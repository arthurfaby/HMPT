import { Spinner } from "@/components/ui/spinner";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { MessageDto } from "@/dtos/message_dto";
import { UserDto } from "@/dtos/user_dto";
import { useAuth } from "@/hooks/useAuth";
import { kyGET } from "@/utils/ky/handlers";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Route : /chat/:userId
export default function Chat() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  // Get user id
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await kyGET<UserDto>(`users/${userId}`, logout);

      if (userData) {
        setUser(userData);
        setLoading(false);
      } else {
        toast.error("User not found");
        //TODO: Redirect to matches
      }
    };

    fetchUser();
  }, []);

  if (userId?.match(/^\d+$/) == null) {
    return <Navigate to={"/matches"} />;
  }

  return (
    <FullHeightContainer
      className={
        loading ? "flex flex-col items-center justify-center" : "flex flex-col"
      }
    >
      {loading ? (
        <Spinner className="mx-auto mb-4 size-32">Chargement...</Spinner>
      ) : (
        <>
          <div className="w-full p-4 shadow-md">chat</div>
          <div className="mx-auto w-full max-w-3xl p-4"></div>
        </>
      )}
    </FullHeightContainer>
  );
}
