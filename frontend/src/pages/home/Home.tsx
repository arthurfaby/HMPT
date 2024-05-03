import heart from "../../assets/heart.webp";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <img src={heart} alt="home" />
      <h2 className="home-title">Please create an account or log in to access the app.</h2>
    </div>
  );
};

export default Home;
