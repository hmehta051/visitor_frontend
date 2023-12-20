import { useContext, useEffect, useState } from "react";
import useStaffMember from "../hooks/useStaffMember";
import { ApplicationContext } from "../context/ApplicationContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";

const VisitRequest = () => {
  const { staffList } = useStaffMember();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const { visitorList } = useContext(ApplicationContext);
  const [person, setPerson] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData] = useState({
    staff_member_id: "",
    visitor_id: "",
    reason: "",
  });

  const handleChangePerson = (e) => {
    const { value } = e.target;
    setPerson(value);
    setSearchTerm(value);
    setOpenDropDown(true);
  };

  const handleSelectStaff = (selectedStaff) => {
    formData.staff_member_id = selectedStaff._id;
    if (selectedStaff.name === "No Result Found") {
      setPerson("");
    } else {
      setPerson(selectedStaff.name);
    }
    setOpenDropDown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    formData.visitor_id = visitorList._id;
    formData.reason = reason;
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/confirm-visit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setLoading(false);
        navigate("/drinks-snacks");
      } else {
        setLoading(false);
        // Handle errors (e.g., show an error message)
        console.error("Failed to submit visit request");
      }
    } catch (error) {
      setLoading(false);
      // Handle exceptions or network errors
      console.error("Error submitting visit request:", error);
    }
  };

  useEffect(() => {
    const results = staffList.filter((staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setSearchResults([{ name: "No Result Found" }]);
    } else {
      setSearchResults(results);
    }
  }, [searchTerm, staffList]);

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-2xl text-center mb-10 uppercase border-2 border-grey-500 p-2">
        Visitor Web App
      </h1>
      <div className="border-2 border-grey-500 p-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="person"
            >
              Whom to visit
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="person"
              type="text"
              placeholder="Enter person to meet"
              name="person"
              value={person}
              onChange={handleChangePerson}
              autoComplete="off"
              required
            />

            <div className="w-full relative">
              {openDropDown && (
                <ul className="absolute z-10 bg-white border rounded mt-1 w-full flex flex-col gap-2 overflow-scroll p-1">
                  {searchResults.map((staff, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-start gap-2"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREeNdYzHmaqHryVdrkeR3NI7Jtov9w3xedCg&usqp=CAU"
                          alt={staff.name}
                          width="50px"
                          height="50px"
                        />

                        <li
                          className="cursor-pointer p-2 hover:bg-gray-200 w-full"
                          onClick={() => handleSelectStaff(staff)}
                        >
                          {staff.name}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason for Visit
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              placeholder="Enter reason for visit"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Loading..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitRequest;
