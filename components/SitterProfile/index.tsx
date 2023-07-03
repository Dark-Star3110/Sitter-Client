import React, { FC } from "react";
import { Sitter } from "../../types";
import styles from "./SitterProfile.module.css";
import { request } from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";

type Props = {
  sitter?: Sitter;
};

const SitterProfile: FC<Props> = ({ sitter }) => {
  const router = useRouter();
  const { user, setUser } = React.useContext(UserContext);
  const [error, setError] = React.useState<string>(
    sitter ? "" : "自身の情報を提供してください"
  );
  const [sitterInfo, setSitterInfo] = React.useState<Sitter>(
    sitter ||
      ({
        sitter_name: "",
        sex: "",
        phone: "",
        certification: "",
        year_ex: 0,
        hourly_salary: 0,
        language: "",
        food: "",
      } as Sitter)
  );

  const handleSubmit = async () => {
    if (!sitterInfo.sitter_name || !sitterInfo.phone) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setError("名前と電話番号は必須です");
      return;
    }
    try {
      const res = await request<Sitter>({
        method: "POST",
        path: "/account/sitter/update",
        data: sitterInfo,
      });
      user && setUser({ ...user, sitter: res });
      setError("");
      if (!sitter) {
        router.push("/");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["sitter-profile"]}>
        <div className={styles["sitter-profile-logo"]}>
          シッターのプロファイ―ル
        </div>
        {error && <div className={styles["info-error"]}>{error}</div>}
        <div className={styles["form_profile"]}>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>名前*</label>
            <input
              type="text"
              name="profile_name"
              placeholder="名を書いてください"
              value={sitterInfo.sitter_name}
              onChange={(e) =>
                setSitterInfo({ ...sitterInfo, sitter_name: e.target.value })
              }
            />
            <label>電話番号*</label>
            <input
              type="tel"
              name="phonenumber"
              placeholder="電話番号を書いてください"
              value={sitterInfo.phone}
              onChange={(e) =>
                setSitterInfo({ ...sitterInfo, phone: e.target.value })
              }
            />
            <label>ジェンダー</label>
            <div className={styles["gender-checkbox"]}>
              <label>
                <input
                  type="checkbox"
                  name="sex"
                  checked={sitterInfo.sex === "male"}
                  onChange={() =>
                    setSitterInfo({
                      ...sitterInfo,
                      sex: sitterInfo.sex === "male" ? "" : "male",
                    })
                  }
                />
                男性
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sex"
                  checked={sitterInfo.sex === "female"}
                  onChange={() =>
                    setSitterInfo({
                      ...sitterInfo,
                      sex: sitterInfo.sex === "female" ? "" : "female",
                    })
                  }
                />
                女性
              </label>
            </div>
            <div className={styles["upload-avatar"]}>
              <label>アバター</label>
              <label
                htmlFor="avatar-upload"
                className={styles["upload-avatar__label"]}
              >
                アップロード
              </label>
              <input
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
              />
            </div>
            <label>言語</label>
            <div className={styles["language-checkbox"]}>
              <label htmlFor="english">
                <input
                  type="checkbox"
                  id="english"
                  checked={sitterInfo.language.includes("English")}
                  onChange={() =>
                    setSitterInfo({
                      ...sitterInfo,
                      language: sitterInfo.language.includes("English")
                        ? sitterInfo.language
                            .split(", ")
                            .filter((lang) => lang !== "English" && lang !== "")
                            .join(", ")
                        : sitterInfo.language
                            .split(", ")
                            .filter((lang) => lang !== "")
                            .concat("English")
                            .join(", "),
                    })
                  }
                />
                英語
              </label>
              <label htmlFor="vietnamese">
                <input
                  type="checkbox"
                  id="vietnamese"
                  checked={sitterInfo.language.includes("Vietnamese")}
                  onChange={() =>
                    setSitterInfo({
                      ...sitterInfo,
                      language: sitterInfo.language.includes("Vietnamese")
                        ? sitterInfo.language
                            .split(", ")
                            .filter(
                              (lang) => lang !== "Vietnamese" && lang !== ""
                            )
                            .join(", ")
                        : sitterInfo.language
                            .split(", ")
                            .filter((lang) => lang !== "")
                            .concat("Vietnamese")
                            .join(", "),
                    })
                  }
                />
                ベトナム語
              </label>
              <label htmlFor="japanese">
                <input
                  type="checkbox"
                  id="japanese"
                  checked={sitterInfo.language.includes("Japanese")}
                  onChange={() =>
                    setSitterInfo({
                      ...sitterInfo,
                      language: sitterInfo.language.includes("Japanese")
                        ? sitterInfo.language
                            .split(", ")
                            .filter(
                              (lang) => lang !== "Japanese" && lang !== ""
                            )
                            .join(", ")
                        : sitterInfo.language
                            .split(", ")
                            .filter((lang) => lang !== "")
                            .concat("Japanese")
                            .join(", "),
                    })
                  }
                />
                日本語
              </label>
            </div>
            <label htmlFor="skill">スキル</label>
            <input
              type="text"
              name="skill"
              placeholder="スキルを書いてください"
              value={sitterInfo.food}
              onChange={(e) =>
                setSitterInfo({ ...sitterInfo, food: e.target.value })
              }
            />
            <label htmlFor="pay">時給</label>
            <input
              type="number"
              name="pay"
              value={sitterInfo.hourly_salary}
              onChange={(e) =>
                setSitterInfo({
                  ...sitterInfo,
                  hourly_salary: Number(e.target.value),
                })
              }
            />
            <label>認証</label>
            <select
              className={styles["custom-select"]}
              value={sitterInfo.certification}
              onChange={(e) =>
                setSitterInfo({ ...sitterInfo, certification: e.target.value })
              }
            >
              <option value="">なし</option>
              <option value="BCI">BCI</option>
              <option value="CPR">CPR</option>
              <option value="Safe Sitter">Safe Sitter</option>
            </select>
            <label htmlFor="experience">経験年数</label>
            <select
              className={styles["exp-select"]}
              value={sitterInfo.year_ex}
              onChange={(e) =>
                setSitterInfo({
                  ...sitterInfo,
                  year_ex: Number(e.target.value),
                })
              }
            >
              <option value="0">１年以下</option>
              <option value="1">１年</option>
              <option value="2">２年</option>
              <option value="3">３年</option>
              <option value="4">４年</option>
              <option value="5">4年以上</option>
            </select>
            <input type="submit" value="送信" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SitterProfile;
