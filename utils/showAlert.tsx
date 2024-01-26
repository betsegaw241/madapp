import React, { useState } from "react";
import CustomAlert from "../components/Alert/Alert";

const showAlert = (props: { title: string; message: string; }) => {
  const [isAlertVisible, setAlertVisible] = useState(true); 

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  return (
    isAlertVisible && (
      <CustomAlert
        visible={isAlertVisible}
        title={props.title}
        message={props.message}
        onClose={handleCloseAlert}
      />
    )
  );
};

export default showAlert;
