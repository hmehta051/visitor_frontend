import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";

const useStaffMember = () => {
  const [staffList, setStaffList] = useState([]);

  const handleFetchStaffMember = () => {
    const response = axios.get(`${apiUrl}/api/staff`);
    response
      .then(({ data }) => {
        if (data.status === "success") {
          setStaffList(data.staff);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    handleFetchStaffMember();
  }, []);
  return { staffList };
};
export default useStaffMember;
