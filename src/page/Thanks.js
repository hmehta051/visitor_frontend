import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContextProvider";
import useVisitorDetails from "../hooks/useVisitorDetails";
import useVisitorDrinks from "../hooks/useVisitorDrinks";

const ThankYou = () => {
  const { visitorList, clickOnNo } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const { visitorDetails } = useVisitorDetails();
  const { vDrinks } = useVisitorDrinks();
  const [staffMemberName, setStaffMemberName] = useState([]);
  const [drinks, setDrinks] = useState(undefined);

  useEffect(() => {
    const visitorId = visitorList._id;
    let filterVisitor;
    if (visitorDetails) {
      filterVisitor = visitorDetails.filter(
        (elem) => elem.visitor_id === visitorId
      );
    }
    setStaffMemberName(filterVisitor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorDetails]);

  useEffect(() => {
    const visitorId = visitorList._id;
    const { visitorDrinks } = vDrinks;
    let filterDrinks;
    if (visitorDrinks) {
      filterDrinks = visitorDrinks.filter(
        (elem) => elem.visitor_id === visitorId
      );
    }
    setDrinks(filterDrinks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vDrinks]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="max-w-md mx-auto my-8 bg-white shadow-md">
      <h1 className="text-2xl text-center mb-10 uppercase border-2 border-grey-500 p-2">
        Visitor Web App
      </h1>
      <div className="border-2 border-grey-500 p-2">
        <div className="rounded px-8 pt-6 pb-8 mb-4">
          <div className="text-xl font-bold mb-4">Thanks for visiting Us!</div>
          <div className="mb-2">
            Whom to visit :{" "}
            {clickOnNo ? (
              "N/A"
            ) : (
              <>
                {staffMemberName.length > 0 && (
                  <span className="font-bold uppercase">
                    {staffMemberName[0].staff_member_id.name}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="mb-2 font-semibold">
            Our representative will contact you soon Meanwhile you can enjoy
            your drinks and snacks!!
          </div>
          <div>
            Drinks:{" "}
            {clickOnNo ? (
              "N/A"
            ) : (
              <>
                {drinks && (
                  <span className="font-bold">
                    {drinks[0].drink_id.map((elem) => (
                      <Fragment key={elem._id}>{elem.name},</Fragment>
                    ))}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
