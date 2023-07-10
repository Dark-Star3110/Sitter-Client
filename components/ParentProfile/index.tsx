import React, { FC } from "react";
import styles from "./ParentProfile.module.css";
import { Parent } from "../../types";
import { request } from "../../utils/api";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { uploadFile } from "../../utils/uploadFile";

type Props = {
  parent?: Parent;
};

const IMAGE_PATH =
  "https://qrxfodpyxhchwlkojpkv.supabase.co/storage/v1/object/public/avatar/";

const ParentProfile: FC<Props> = ({ parent }) => {
  const router = useRouter();
  const [error, setError] = React.useState<string>(
    parent ? "" : "自身の情報を提供してください"
  );
  const { user, setUser } = React.useContext(UserContext);
  const [parentInfo, setParentInfo] = React.useState<Parent>(
    parent ||
      ({
        parent_name: "",
        phone: "",
        emergecy_phone: "",
        address: "",
      } as Parent)
  );
  const [avatar, setAvatar] = React.useState<File | null>(null);

  const handleSubmit = async () => {
    if (!parentInfo.parent_name || !parentInfo.phone || !parentInfo.address) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setError("名前を入力してください");
      return;
    }
    try {
      let path = "";
      if (avatar)
        path = await uploadFile(`${Date.now()}-${avatar.name}`, avatar);
      const res = await request<Parent>({
        method: "POST",
        path: "/account/parent/update",
        data: { ...parentInfo, ...(path ? { avatar: IMAGE_PATH + path } : {}) },
      });
      user && setUser({ ...user, parent: res });
      setError("");
      if (!parent) {
        router.push("/");
      }
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
    }
  };
  return (
    <div className={styles["info-guardian"]}>
      <div className={styles["info-logo"]}>保護者のプロファイ―ル</div>
      {error && <div className={styles["info-error"]}>{error}</div>}
      <div className={styles["info-form"]}>
        <label>名前*</label>
        <input
          type="text"
          name="guardian-name"
          value={parentInfo.parent_name}
          onChange={(e) =>
            setParentInfo({ ...parentInfo, parent_name: e.target.value })
          }
        />
        <label>電話番号*</label>
        <input
          type="text"
          name="guardian-phone"
          value={parentInfo.phone}
          onChange={(e) => {
            setParentInfo({ ...parentInfo, phone: e.target.value });
          }}
        />
        <label>場所*</label>
        <input
          type="text"
          name="guardian-place"
          value={parentInfo.address}
          onChange={(e) =>
            setParentInfo({ ...parentInfo, address: e.target.value })
          }
        />
        <div className={styles["info-avatar"]}>
          <label>アバター</label>
          <label htmlFor="avatar-img" className={styles["label-img"]}>
            ファイルアッ ブロード
          </label>
          <input
            type="file"
            name="image-file"
            id="avatar-img"
            style={{ display: "none" }}
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          />
        </div>
        <label>緊急連絡先の電話番号</label>
        <input
          type="text"
          name="emergency-contact"
          value={parentInfo.emergecy_phone}
          onChange={(e) =>
            setParentInfo({ ...parentInfo, emergecy_phone: e.target.value })
          }
        />
        <label>赤ちゃんの情報</label>
        <textarea className={styles["baby-information"]} defaultValue={""} />
        <input type="submit" value="送信" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ParentProfile;
