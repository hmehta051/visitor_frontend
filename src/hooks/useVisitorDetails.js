import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";

const useVisitorDetails = () => {
  const [visitorDetails, setVisitorDetails] = useState([]);

  const handleFetchStaffMember = () => {
    const token = localStorage.getItem("token");
    const response = axios.get(`${apiUrl}/api/member-list`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
        "Content-Type": "application/json",
      },
    });
    response
      .then(({ data }) => {
        if (data.status === "success") {
          setVisitorDetails(data.vDetails);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    handleFetchStaffMember();
  }, []);
  return { visitorDetails };
};
export default useVisitorDetails;
