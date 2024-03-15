import React, { useEffect, useRef, useState } from "react"
import { LuVideo } from "react-icons/lu";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-3`}>
          <span>
            <LuVideo size="20" />
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion
