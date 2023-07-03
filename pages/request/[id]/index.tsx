import React from "react";
import { UserContext } from "../../../context/UserContext";
import ParentRequest from "../../../components/ParentRequestDetail";
import SitterRequest from "../../../components/SitterRequestDetail";

const RequestDetail = () => {
  const { isLoading, user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/signin";
    }
  }, [isLoading, user]);

  return <>{user?.role === "parent" ? <ParentRequest /> : <SitterRequest />}</>;
};

export default RequestDetail;
