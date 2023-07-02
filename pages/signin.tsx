import React from "react";
import styles from "../styles/Signin.module.css";

const SignIn = () => {
  return (
    <div style={{ paddingTop: 30, display: "flex", justifyContent: "center" }}>
      <div className={styles["login"]}>
        <div className={styles["logo"]}>
          <img src="/assets/avatar.jpg" alt="BabySitter" />
        </div>
        <div className={styles["form_login"]}>
          <form>
            <label htmlFor="user_name">ユーザー名</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="ユーザー名を書いてください"
            />
            <label htmlFor="password">パスワード</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="パスワードを書いてください"
            />
            <label className={styles["checkbox-label"]}>
              <input type="checkbox" className={styles["checkbox-input"]} />
              <span className={styles["checkbox-text"]}>パスワード</span>
            </label>
            <button className={styles["login_button"]}>ログイン</button>
            <button className={styles["login_button"]}>
              Facebookでログイン
            </button>
            <a href="#" className={styles["signup_text"]}>
              メンバーではありませんか? 保護者または保母として登録する
            </a>
            <a href="#" className={styles["password_forgot"]}>
              パスワードをお忘れの方はこちら
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
