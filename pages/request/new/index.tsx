import React from "react";
import styles from "./New.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Sitter } from "../../../types";

const RequestForm = () => {
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_URL;
  const [sitters, setSitters] = React.useState<Sitter[]>([]);
  const [sitterName, setSitterName] = React.useState<string>("");
  const [requestData, setRequestData] = React.useState({
    start_time: "",
    end_time: "",
    data: "",
    state: "wait",
    parent_id: 5,
    sitter_id: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${SERVER_API}/sitters`);
        if (res.data) {
          setSitters(res.data);
        } else {
          setSitters([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [SERVER_API]);

  const createRequest = async () => {
    const sitterNameExist = sitters.find(
      (sitter) => sitter.sitter_name === sitterName
    );
    if (!sitterNameExist) {
      await Swal.fire("エラー!", "シッターが見つかりません!", "error");
    } else {
      try {
        const res = await axios.post(`${SERVER_API}/request/create-request`, {
          ...requestData,
          sitter_id: sitterNameExist.id,
        });
        if (res.data) {
          await Swal.fire({
            title: "成功！",
            icon: "success",
            html: `<a href="/request/${res.data.id}/parent" target="_blank"><u>リクエスト情報を表示する</u></a>`,
          });
          setRequestData({
            start_time: "",
            end_time: "",
            data: "",
            state: "wait",
            parent_id: 5,
            sitter_id: "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div
        className={styles["main_web"]}
        style={{
          margin: "30px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles["send_request"]}>
          <div className={styles["logo"]}>
            <img src="/assets/avatar.jpg" alt="BabySitter" />
          </div>
          <div className={styles["form_request"]}>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="name_send">名前</label>
              <input
                type="text"
                id="name_send"
                name="name_send"
                placeholder="名前を書いてください"
                value={sitterName}
                onChange={(e) => {
                  setSitterName(e.target.value);
                }}
              />
              <label htmlFor="place_send">会いたい場所</label>
              <input
                type="text"
                id="place_send"
                name="place_send"
                placeholder="会いたい場所を書いてください"
              />
              <label htmlFor="time">会いたい時間</label>
              <div className={styles["time_input"]} style={{ display: "flex" }}>
                <input
                  type="text"
                  id="time_from"
                  name="time_from"
                  placeholder="会いたい時間から"
                  value={requestData.start_time}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      start_time: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  id="time_to"
                  name="time_to"
                  placeholder="会いたい時間まで"
                  value={requestData.end_time}
                  onChange={(e) => {
                    setRequestData({
                      ...requestData,
                      end_time: e.target.value,
                    });
                  }}
                />
              </div>
              <label htmlFor="option_send">赤ちゃんの情報</label>
              <textarea
                id="option_send"
                name="option_send"
                placeholder="子供の情報を入力してください"
                value={requestData.data}
                onChange={(e) => {
                  setRequestData({
                    ...requestData,
                    data: e.target.value,
                  });
                }}
              ></textarea>
              <input value="送信" type="button" onClick={createRequest} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestForm;
