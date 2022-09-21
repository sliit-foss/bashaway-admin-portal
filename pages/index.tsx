import type { NextPage } from "next";
import { Header } from "../components/header";
import { HomeItem } from "../components/home-item";

const Home: NextPage = () => {
  const array = new Array(5);

  array.fill(<HomeItem />);
  return (
    <>
      <Header />
      <div className="flex flex-row flex-wrap">{array}</div>
    </>
  );
};

export default Home;
