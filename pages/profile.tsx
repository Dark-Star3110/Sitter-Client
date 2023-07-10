import React, { useContext, useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import ParentProfile from "../components/ParentProfile";
import SitterProfile from "../components/SitterProfile";

const Profile = () => {
  const router = useRouter();
  const { user, isLoading } = useContext(UserContext);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["container"]}>
      {user?.role === "parent" ? (
        <ParentProfile parent={user.parent} />
      ) : (
        <SitterProfile sitter={user?.sitter} />
      )}
    </div>
  );
};

export default Profile;
