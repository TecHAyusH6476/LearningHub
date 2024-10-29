/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React  from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const UserCourseData = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="">
      <Card className="w-full max-w-md rounded-xl bg-[#fff]">
        <img
          alt="Card Image"
          className="object-cover rounded-t-xl"
          src={course.thumbnail}
        />
        <CardContent className="p-4 space-y-4">
          <CardTitle className="text-2xl font-bold text-black">
            {course.name.slice(0, 20)}...
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400">
            {course.description.slice(0, 50)}...
          </p>
          <div className="flex justify-center items-center gap-x-2">
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="w-full rounded-lg p-2 bg-[#5932EA] text-[#fff]"
            >
              View Course
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCourseData;
