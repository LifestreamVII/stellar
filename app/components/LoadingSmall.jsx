import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const LoadingSmall = ({ percent, status, message }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const newStyle = {
      opacity: 1,
      width: `${percent}%`,
    };

    setStyle(newStyle);
  }, [percent]);

  return status === "error" ? (
    <div className="error">
      <FaTimesCircle title={message} />
    </div>
  ) : status === "warning" ? (
    <FaExclamationTriangle title={message} />
  ) : status === "done" ? (
    <FaCheckCircle title={message} />
  ) : (
    <div className="load-bar">
      <div
        className={status === "pending" ? "progress pending" : "progress"}
        style={style}
      ></div>
    </div>
  );
};

export default LoadingSmall;
