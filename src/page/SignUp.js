import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContextProvider";
import axios from "axios";
import { apiUrl } from "../config";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const { setVisitorList } = useContext(ApplicationContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post(`${apiUrl}/api/visitor/auth`, formData);
    response
      .then(({ data }) => {
        if (data.status === "success") {
          setVisitorList(data.visitor);
          localStorage.setItem("token", data.token);
          navigate("/visit-request");
        }
      })
      .catch((err) => console.log(err.message));
  };

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
              htmlFor="name"
            >
              Name<sup className="text-red-600">*</sup>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              min={2}
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile<sup className="text-red-600">*</sup>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="text"
              placeholder="Enter your mobile number"
              name="mobile"
              pattern="[0-9]*"
              minLength={10}
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
