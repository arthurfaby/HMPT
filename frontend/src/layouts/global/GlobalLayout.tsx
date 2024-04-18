import Navbar from "./components/navbar/Navbar";

type GlobalLayoutProps = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default GlobalLayout;
