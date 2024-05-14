import heart from "../../assets/heart.webp";
import "./home.css";

const Home = () => {
  return (
    <div className="home-page flex h-screen flex-col items-center justify-center  w-full gap-8 bg-secondary">
      <img src={heart} alt="home" className="h-1/2 aspect-square" />
      <h2 className="text-secondary-foreground text-center text-4xl font-bold">
        Please create an account or log in to access the app.
      </h2>
    </div>
  );
};

export default Home;
