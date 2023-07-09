import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#000" }}>
      <div className={styles.container}>
        <div className={styles["footer-contact"]}>
          <Link href="/">ホームページ</Link>
          <a href="">
            ベビーシッター
            <br />
            につぃて
          </a>
          <a href="">
            さーティフィ
            <br />
            ケーション
          </a>
        </div>
        <div className={styles["footer-information"]}>
          <div className={styles["tagName"]}>
            <div
              style={{
                textAlign: "center",
                fontSize: "30px",
                margin: "10px",
                padding: "5px",
              }}
            >
              住所
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                margin: "10px",
                padding: "5px",
              }}
            >
              ホットライン
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                margin: "10px",
                padding: "5px",
              }}
            >
              メール
            </div>
          </div>
          <div className={styles["information"]}>
            <div
              style={{ textAlign: "left", fontSize: "30px", margin: "10px" }}
            >
              Hai Ba Trung dist, Ha Noi, Viet Nam
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: " 24px",
                margin: "10px",
                paddingTop: "12px",
              }}
            >
              0969696969
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: " 24px",
                margin: "10px",
                paddingTop: "12px",
              }}
            >
              tranbinhminh1403@gmail.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
