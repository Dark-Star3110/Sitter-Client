import React, { useCallback } from "react";
import styles from "./RequestParent.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ERequestState, Request } from "../../../types";
import { formatDate } from "../../../utils/date";

const ParentRequest = () => {
  const SERVER_API = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const requestId = router.query.id;
  const [request, setRequest] = React.useState<Request | null>();

  const fetchData = useCallback(async () => {
    try {
      const requestData = await axios.get(`${SERVER_API}/request/${requestId}`);
      if (requestData.data) {
        setRequest(requestData.data);
      } else {
        setRequest(null);
      }
    } catch (err) {
      console.error(err);
    }
  }, [SERVER_API, requestId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!request) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      className={styles["information_main"]}
      style={{ padding: "40px", display: "flex", justifyContent: "center" }}
    >
      <div className={styles["information_form"]}>
        <form>
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
          <span className={styles["select_id"]} style={{ padding: "4px 8px" }}>
            {request.state === "wait"
              ? ERequestState.wait
              : request.state === "accepted"
              ? ERequestState.accepted
              : ERequestState.rejected}
          </span>
        </form>
      </div>
    </div>
  );
};

export default ParentRequest;
