// components/common/ProgressBarBar.jsx
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const ProgressBarBar = ({ completed = 0, height = "16px", bgColor = "#ffbf00", baseBgColor = "#e5e7eb", labelColor = "#111827", labelSize = "7px" }) => {
  return (
    <div className="w-full">
      <ProgressBar
        completed={completed}
        height={height}
        bgColor={bgColor}
        baseBgColor={baseBgColor}
        labelColor={labelColor}
        labelSize={labelSize}
        isLabelVisible={true}
      />
    </div>
  );
};

export default ProgressBarBar;
