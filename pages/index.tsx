import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
