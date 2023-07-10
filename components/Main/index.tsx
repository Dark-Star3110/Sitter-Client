import React from "react";
import style from "./Main.module.css";
import Link from "next/link";

const Main = () => {
  return (
    <main>
      <div className={style["Main-website"]}>
        <div className={style["button-container"]}>
          <div
            className={style["Background-main-1"]}
            style={{ backgroundImage: `url(assets/avatar.jpg)` }}
          ></div>
          <div className={style["action"]}>
            <Link className={style["custom-button1"]} href="/search">
              ベビーシッターを探す
            </Link>
            <a className={style["custom-button2"]} href="#">
              私はベビーシッター
            </a>
          </div>
        </div>

        <div
          className={style["Background-main"]}
          style={{ backgroundImage: `url(assets/back.jpg)` }}
        ></div>
      </div>
      <div className={style["website-introduction"]}>
        <div className={style.introduction}>
          <img
            src="https://images.ctfassets.net/wmwzystk5o45/2gcs3H3ruX4ypvln6tVd9P/5dfb66655c036142509bbb81fef83cda/Light.svg"
            alt="hình ảnh"
          />
          <p>
            ベビーシッター
            <br />
            瞬のお手伝い <br />
            ギリギリのニーズで,デート ナイト. など
          </p>
        </div>
        <div className={style.introduction}>
          <img
            src="https://images.ctfassets.net/wmwzystk5o45/3CZcvYJNeQTsdbE71Wy7t8/991e910a47763f039a6d3e32808274a6/Light.svg"
            alt="hình ảnh"
          />
          <p>
            特別な必要性
            <br />
            お子さま一人ひ
            <br />
            とりのニーズに
            <br />
            応える専門的な看護
          </p>
        </div>
        <div className={style.introduction}>
          <img
            src="https://images.ctfassets.net/wmwzystk5o45/39vP0uEHOuVa48hr4z1w8a/df54cda4d83b2b35c68315d844970fb8/Light.svg"
            alt="hình ảnh"
          />
          <p>
            チュータリング
            <br />
            数学英語読
            <br />
            吉などの教科の
            <br />
            教育的ケア
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;
