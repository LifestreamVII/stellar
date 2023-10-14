import React, { useState } from "react";

const Tooltip = ({
    content,
    children,
    position = 'top'
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div className="tooltip-wrapper">
        <div
          className="tooltip-children"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </div>
       {isHovered && (
          <div
            className={`tooltip tooltip-${position}`}
          >
            <div className="tooltip-content">{content}</div>
          </div>
        )}
      </div>
    );
  };

export default Tooltip