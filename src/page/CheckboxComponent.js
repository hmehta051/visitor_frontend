import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContextProvider";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config";

const CheckboxComponent = () => {
  const [checkboxes, setCheckboxes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    selectedDrinks: [],
  });
  const { visitorList, setClickOnNo } = useContext(ApplicationContext);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        selectedDrinks: [...formData.selectedDrinks, value],
      });
    } else {
      setFormData({
        ...formData,
        selectedDrinks: formData.selectedDrinks.filter(
          (drinkId) => drinkId !== value
        ),
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const requestData = {
        visitor_id: visitorList._id,
        drink_id: formData.selectedDrinks,
      };
      if (formData.selectedDrinks.length === 0) {
        alert("Please Select Drinks");
      } else {
        setLoading(true);
        const response = await axios.post(
          `${apiUrl}/api/visitor-drinks`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          setLoading(false);
          navigate("/thank-you");
        } else {
          setLoading(false);
          console.log(response.data.errors);
          console.error("Failed to send selected drinks");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending selected drinks:", error);
    }
  };

  useEffect(() => {
    // Fetch checkboxes from the backend
    const fetchCheckboxes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/drinks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.length !== 0) {
          setCheckboxes(response.data);
        } else {
          console.error("Failed to fetch checkboxes");
        }
      } catch (error) {
        console.error("Error fetching checkboxes:", error);
      }
    };

    fetchCheckboxes();
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 bg-white shadow-md">
      <h1 className="text-2xl text-center mb-10 uppercase border-2 border-grey-500 p-2">
        Visitor Web App
      </h1>
      <div className="border-2 border-grey-500 p-2">
        <div className="rounded px-8 pt-6 pb-8 mb-4">
          {checkboxes.map((checkbox) => (
            <div className="mb-4" key={checkbox._id}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value={checkbox._id}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <div className="w-1/6 flex items-center justify-between ml-2">
                  <img
                    src={checkbox.image}
                    alt={checkbox.name}
                    className="h-5"
                  />
                  <span className="ml-2">{checkbox.name}</span>
                </div>
              </label>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Yes"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setClickOnNo(true)}
            >
              No,Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxComponent;
