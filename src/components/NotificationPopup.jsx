import React from "react";

const NotificationPopup = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 bg-green-500 text-white p-4 rounded-md shadow-lg z-50">
      {message}
    </div>
  );
};

export default NotificationPopup;
