import heart from "../../assets/heart.webp";
import "./home.css";
import { FullHeightContainer } from "@/components/utils/full-height-container";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { Matches } from "@/pages/matches/matches";

const Home = () => {
  const { status } = useAuth();

  if (status === AuthStatus.Authenticated) {
    return <Matches />;
  }
  return (
    <FullHeightContainer className="home-page flex flex-col items-center justify-center  w-full gap-8 bg-secondary">
      <img src={heart} alt="home" className="h-1/2 aspect-square" />
      <h2 className="text-secondary-foreground text-center text-4xl font-bold">
        Please create an account or log in to access the app.
      </h2>
    </FullHeightContainer>
  );
};

export default Home;
