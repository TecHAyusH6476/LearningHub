/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Switch } from "@/components/ui/switch";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
// import { Progress } from "@/components/ui/progress";

const CourseSyllabus = ({ syllabus, course }) => {
  const [expandedWeeks, setExpandedWeeks] = useState([]);
  const [switchColors, setSwitchColors] = useState({}); 

  const [enrolled, setEnrolled] = useState(false);
  const [user] = useAuthState(auth);
  const [User, isUser] = useState("");

  useEffect(() => {
    isUser(user);
  }, []);

  const isEnrolled = async () => {
    try {
      const isEnrolled = course.students.some(
        (student) => student.email === User.email
      );
      setEnrolled(isEnrolled);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    isEnrolled();
  }, [course.students]);

  const toggleWeek = (index) => {
    if (expandedWeeks.includes(index)) {
      setExpandedWeeks(expandedWeeks.filter((week) => week !== index));
    } else {
      setExpandedWeeks([...expandedWeeks, index]);
    }
  };

  const handleSwitchClick = (index) => {
    setSwitchColors((prevColors) => {
      return {
        ...prevColors,
        [index]: prevColors[index] === "green" ? "black" : "green",
      };
    });
  };

  const calculateProgress = () => {
    const totalWeeks = syllabus.length;
    const completedWeeks = Object.values(switchColors).filter(
      (color) => color === "green"
    ).length;
    return totalWeeks ? ((completedWeeks / totalWeeks) * 100).toFixed(0) : 0;
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-[#5932EA] mb-3">
        Course Syllabus
      </h1>
      <div className="space-y-2">
        {syllabus.length > 0 &&
          syllabus.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 border rounded-lg bg-[#f4f4f4]"
            >
              <div
                className="flex justify-between items-center cursor-pointer "
                onClick={() => toggleWeek(index)}
              >
                <h2 className="text-lg font-semibold text-black">
                  Week {item.week}
                </h2>
                {expandedWeeks.includes(index) ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              {expandedWeeks.includes(index) && (
                <div className="ml-4">
                  <li className="font-semibold pb-2 text-black">
                    Topic: {item.topic}
                  </li>
                  <li className="text-black">{item.content}</li>
                  {enrolled && (
                    <li className="flex justify-start items-center">
                      <p className="p-4 font-semibold text-black">Status:</p>{" "}
                      <Switch
                        className=""
                        switchColor={switchColors[index] || "black"}
                        onClick={() => handleSwitchClick(index)}
                      />
                    </li>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      {enrolled && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold space-y-2 text-black">
            Progress Report
          </h2>
          {/* <Progress className="w-full" value={calculateProgress()}/> */}
          <p className="text-green-500">{calculateProgress()}% completed</p>
          <progress
            className=" progress-success w-full bg-white"
            value={calculateProgress()}
            max="100"
          ></progress>
        </div>
      )}
    </div>
  );
};

export default CourseSyllabus;
