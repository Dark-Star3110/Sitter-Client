import React from "react";
import styles from "../styles/Signin.module.css";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { request } from "../utils/api";
import Swal from "sweetalert2";

const SignIn = () => {
  const router = useRouter();
  const { user, setIsAuth } = React.useContext(UserContext);
  if (user) {
    router.push("/");
  }
  const [userSignIn, setUserSignIn] = React.useState({
    user_name: "",
    password: "",
  });

  const signIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await request({
      method: "POST",
      path: `/account/signIn`,
      data: userSignIn,
      async onError(error) {
        console.error(error);
        await Swal.fire("エラー!", error.response.data.message, "error");
      },
      async onSuccess(data) {
        setIsAuth(true);
        localStorage.setItem("access_token", data.token);
        router.push("/");
      },
    });
    return true;
  };

  return (
    <div style={{ paddingTop: 30, display: "flex", justifyContent: "center" }}>
      <div className={styles["login"]}>
        <div className={styles["logo"]}>
          <img src="/assets/avatar.jpg" alt="BabySitter" />
        </div>
        <div className={styles["form_login"]}>
          <form onSubmit={signIn}>
            <label htmlFor="user_name">ユーザー名</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="ユーザー名を書いてください"
              value={userSignIn.user_name}
              onChange={(e) =>
                setUserSignIn({ ...userSignIn, user_name: e.target.value })
              }
            />
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="パスワードを書いてください"
              value={userSignIn.password}
              onChange={(e) =>
                setUserSignIn({ ...userSignIn, password: e.target.value })
              }
            />
            <label className={styles["checkbox-label"]}>
              <input type="checkbox" className={styles["checkbox-input"]} />
              <span className={styles["checkbox-text"]}>
                次回から自動的にログインする
              </span>
            </label>
            <button type="submit" className={styles["login_button"]}>
              ログイン
            </button>
            <button className={styles["login_button"]}>
              Facebookでログイン
            </button>
            <Link href="/signup" className={styles["signup_text"]}>
              メンバーではありませんか? 保護者または保母として登録する
            </Link>
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
