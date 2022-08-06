import { useEffect, useState } from "react";
import { AlertType } from "../types/types";

type AertPropsType = {
  alert: AlertType;
};

const Alert = ({ alert }: AertPropsType) => {
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    switch (alert) {
      case "soon":
        setAlertType("error");
        setAlertMessage("Too Soon!");
        break;
      case "wrong":
        setAlertType("error");
        setAlertMessage("Wrong Key!");
        break;
      case "late":
        setAlertType("error");
        setAlertMessage("Too Late!");
        break;
      case "success":
        setAlertType("success");
        setAlertMessage("You are Right!!");
        break;
      default:
        setAlertType("");
        setAlertMessage("");
    }
  }, [alert]);

  return (
    <>
      {alertType && alertMessage && (
        <div
          className={`alert alert-${
            alertType === "success" ? "success" : "danger"
          }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default Alert;
