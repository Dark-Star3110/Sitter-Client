import Header from "../../components/Header";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/RequestHistory.module.css";
import React from "react";
import { request } from "../../utils/api";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/date";
import Link from "next/link";

type Response = {
  id: number;
  state: string;
  start_time: string;
  end_time: string;
  parent?: {
    parent_name: string;
  };
  sitter?: {
    sitter_name: string;
  };
};

const RequestHistory = () => {
  const { isLoading, user } = React.useContext(UserContext);
  const [requests, setRequests] = React.useState<Response[]>([]);

  React.useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/signin";
    }
  }, [isLoading, user]);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (user) {
          const requests = await request<Response[]>({
            method: "GET",
            path:
              user.role === "parent" ? "/requests/parent" : "/requests/sitter",
          });
          setRequests(requests);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };
    fetchRequests();
  }, [user]);

  return (
    <div className={styles["history-body"]}>
      <Header />
      <div className={styles["body-request-history"]}>
        <table className={styles["history-property"]}>
          <tbody>
            <tr className={styles["history-items"]}>
              <th>ID</th>
              <th>
                {user?.role === "sitter" ? "乳母の名前" : "シッター／クッカー"}
              </th>
              <th>作成した時間</th>
              <th>状況</th>
            </tr>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>
                  <Link href={"/request/" + request.id}>{request.id}</Link>
                </td>
                <td>
                  {user?.role === "sitter"
                    ? request.parent?.parent_name
                    : request.sitter?.sitter_name}
                </td>
                <td>
                  {formatDate(request.start_time)} -{" "}
                  {formatDate(request.end_time)}
                </td>
                <td>
                  <select
                    value={request.state}
                    disabled={user?.role !== "sitter"}
                  >
                    <option value="accepted">拒否</option>
                    <option value="wait">待機中</option>
                    <option value="rejected">承認</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestHistory;
