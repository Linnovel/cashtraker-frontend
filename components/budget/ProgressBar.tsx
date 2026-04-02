"use client"

import React from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

type ProgressBarProps = {
  percentage: number
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#0c2626" : "#f59E0B",
          trailColor: "#e1e1e1e",
          textColor: percentage >= 100 ? "#0c2626" : "#f59E0B",
          textSize: "8px",
        })}
        text={`${percentage}% Gastado`}
        value={percentage}
      />
    </div>
  )
}

export default ProgressBar
