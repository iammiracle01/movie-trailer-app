import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-red-600">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
