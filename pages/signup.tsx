import React from "react";
import styles from "../styles/Signup.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { request } from "../utils/api";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [userData, setUserData] = React.useState({
    user_name: "",
    password: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const signUp = async () => {
    if (confirmPassword !== userData.password) {
      await Swal.fire("エラー!", "確認パスワードが一致しません!", "error");
      return;
    }

    await request({
      method: "POST",
      path: `/account/signUp`,
      data: userData,
      async onError(error) {
        console.error(error);
        await Swal.fire("エラー!", error.response.data.message, "error");
      },
      async onSuccess(data) {
        await Swal.fire("成功!", "サインアップに成功しました!", "success");
        router.push("/signin");
      },
    });
  };
  return (
    <div style={{ paddingTop: 30, display: "flex", justifyContent: "center" }}>
      <div className={styles["signup-body"]}>
        <div className={styles["signup-logo"]}>
          <img src="/assets/avatar.jpg" alt="image" />
        </div>
        <div className={styles["signup-form"]}>
          <label>ユーザー名</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.user_name}
            onChange={(e) =>
              setUserData({ ...userData, user_name: e.target.value })
            }
          />
          <label>パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <label>パスワード確認</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <div className={styles["button-check"]}>
            <label>
              <input
                type="checkbox"
                checked={userData.role === "parent"}
                onClick={() => {
                  setUserData({
                    ...userData,
                    role: userData.role === "parent" ? "" : "parent",
                  });
                }}
              />
              保護者
            </label>
            <label>
              <input
                type="checkbox"
                checked={userData.role === "sitter"}
                onClick={() => {
                  setUserData({
                    ...userData,
                    role: userData.role === "sitter" ? "" : "sitter",
                  });
                }}
              />
              ベビーシッター /クッカー
            </label>
          </div>
          <input
            type="button"
            name="signup-button"
            value="サインアップ"
            onClick={signUp}
          />
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
