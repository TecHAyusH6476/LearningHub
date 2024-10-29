/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import UserCourseData from "../components/course/UserCourseData";
import { useUserCourses } from "./userCourseData";

const UserCourse = () => {

  const userCourses = useUserCourses();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[65rem] mt-10 mx-auto">
        <div className="text-[#5932EA] text-3xl font-bold mb-10 px-10 md:px-0">
          My Courses
        </div>
        {userCourses.length > 0 && (
          <div className="px-10 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10">
            {userCourses.map((course) => (
              <UserCourseData key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourse;
