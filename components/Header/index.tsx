import React from "react";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <a href="Homepage.html">
          {/* <img src="" alt="ホームページ" title="ホームページ" /> */}
        </a>
      </div>
      <nav className={style["nav-navigation"]}>
        <div className={style["header-right"]}>
          <a className={style.button1} href="#">
            サインイン
          </a>
          <a className={style.button2} href="#">
            サインアップ
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
