import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";

const useVisitorDrinks = () => {
  const [vDrinks, setVDrinks] = useState([]);

  const handleFetchStaffMember = () => {
    const token = localStorage.getItem("token");
    const response = axios.get(`${apiUrl}/api/visitor-drinks`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
        "Content-Type": "application/json",
      },
    });
    response
      .then(({ data }) => {
        if (data.status === "success") {
          setVDrinks(data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    handleFetchStaffMember();
  }, []);
  return { vDrinks };
};
export default useVisitorDrinks;
