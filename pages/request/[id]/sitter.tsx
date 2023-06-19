import React from "react";
import styles from "./RequestParent.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { Request } from "../../../types";
import { formatDate } from "../../../utils/date";
import Swal from "sweetalert2";

const SitterRequest = () => {
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const requestId = router.query.id;
  const [request, setRequest] = React.useState<Request | null>();
  const [requestState, setRequestState] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = await axios.get(
          `${SERVER_API}/request/${requestId}`
        );
        if (requestData.data) {
          setRequest(requestData.data);
          setRequestState(requestData.data.state);
        } else {
          setRequest(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [SERVER_API, requestId]);

  const updateRequestState = async () => {
    try {
      const requestData = await axios.put(
        `${SERVER_API}/request/${requestId}`,
        {
          state: requestState,
        }
      );
      if (requestData.data) {
        await Swal.fire("成功!", "状態は正常に変更されました!", "success");
        setRequest({ ...request!, state: requestData.data.state });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!request) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className={styles["information_main"]}
      style={{ padding: "40px", display: "flex", justifyContent: "center" }}
    >
      <div className={styles["information_form"]}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label style={{ padding: "10px 0px" }}>
            要求のID: <span>{request.id}</span>
          </label>
          <label htmlFor="name_info">会う場所</label>
          <div id="name_info">{request.parent.address}</div>
          <label htmlFor="name">会う時間</label>
          <span className={styles["time_meeting"]} style={{ display: "flex" }}>
            <div id="time_info_from">{formatDate(request.start_time)}</div>
            <div id="time_info_to">{formatDate(request.end_time)}</div>
          </span>
          <label htmlFor="customer_name">保護者の名前</label>
          <div id="customer_name">{request.parent.parent_name}</div>
          <label htmlFor="customer_phone">保護者の電話番号</label>
          <div id="customer_phone">{request.parent.phone}</div>
          <label htmlFor="customer_place">保護者の住所</label>
          <div id="customer_place">{request.parent.address}</div>
          <label htmlFor="sitter_name">乳母の名前</label>
          <div id="sitter_name">{request.sitter.sitter_name}</div>
          <label htmlFor="sitter_phone">乳母の電話番号</label>
          <div id="sitter_phone">{request.sitter.phone}</div>
          <label htmlFor="sitter_place">乳母の住所</label>
          <div id="sitter_place">{request.sitter.address}</div>
          <label htmlFor="baby_info">赤ちゃんの情報</label>
          <div className={styles["baby_info"]}>{request.data}</div>
          <label htmlFor="select_id">状況</label>
          <select
            className={styles["select_id"]}
            onChange={(e) => {
              setRequestState(e.target.value);
            }}
          >
            <option value="wait" selected={requestState === "wait"}>
              待機中
            </option>
            <option value="accepted" selected={requestState === "accepted"}>
              承認
            </option>
            <option value="rejected" selected={requestState === "rejected"}>
              拒否
            </option>
          </select>
          <button
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={updateRequestState}
            type="button"
          >
            更新
          </button>
        </form>
      </div>
    </div>
  );
};

export default SitterRequest;
