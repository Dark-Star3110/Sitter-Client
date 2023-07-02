import React from "react";
import styles from "../styles/Signup.module.css";
import Link from "next/link";

const SignUp = () => {
  return (
    <div style={{ paddingTop: 30, display: "flex", justifyContent: "center" }}>
      <div className={styles["signup-body"]}>
        <div className={styles["signup-logo"]}>
          <img src="/assets/avatar.jpg" alt="image" />
        </div>
        <div className={styles["signup-form"]}>
          <label>ユーザー名</label>
          <input type="text" id="email" name="email" />
          <label>パスワード</label>
          <input type="password" id="password" name="password" />
          <label>パスワード確認</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
          <div className={styles["button-check"]}>
            <label>
              <input type="radio" name="radio" />
              保護者
            </label>
            <label>
              <input type="radio" name="radio" />
              ベビーシッター /クッカー
            </label>
          </div>
          <input type="submit" name="signup-button" value="サインアップ" />
          <p>
            アカウントを既にお持ちの方はごちらから
            <Link href="/signin" style={{ color: "blue" }}>
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
