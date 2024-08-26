import heart from "../../assets/heart.webp";
import "./home.css";
import { FullHeightContainer } from "@/components/utils/full-height-container";

const Home = () => {
  return (
    <FullHeightContainer className="home-page flex w-full flex-col items-center  justify-center gap-8 bg-secondary">
      <img
        src={heart}
        alt="home"
        className="aspect-square h-1/4 max-h-[300px]"
      />
      <h2 className="text-center text-4xl font-bold text-secondary-foreground">
        Créer un compte ou connectez-vous pour accéder à Matcha.
      </h2>
    </FullHeightContainer>
  );
};

export default Home;
