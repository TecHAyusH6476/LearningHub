/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const CoursePrerequistes = ({ prerequisites }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#5932EA]">Prerequisites</h1>
      <p>
        <div className="">
          {prerequisites.length > 0 &&
            prerequisites.map((prerequisite, index) => (
              <li className="text-black" key={index}>
                {prerequisite}
              </li>
            ))}
        </div>
      </p>
    </div>
  );
};

export default CoursePrerequistes;
