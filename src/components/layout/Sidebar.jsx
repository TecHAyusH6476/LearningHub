/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useSelector } from "react-redux";

// components

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { course } = useSelector((state) => state);
  // const { user } = useSelector((state) => state.user);
  // const username = user.displayName;

  const name = localStorage.getItem("name");
  const username = JSON.parse(name);

  const handleLogout = async () => {
    try {
      localStorage.setItem("courses", JSON.stringify(course));
      localStorage.clear();
      const response = await signOut(auth);
      toast.success("User logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <div
        className="md:hidden fixed top-0 right-0 z-50 mr-3 mt-3"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 relative">
          <RxHamburgerMenu className="h-6 w-6 text-black absolute top-3 left-0" />
        </div>
      </div>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed inset-y-0 left-0 z-40 transition duration-300 ease-in-out 
        bg-[#fff] overflow-y-auto p-2 w-1/3 md:w-[20rem] flex flex-col justify-start items-center min-h-screen`}
      >
        <div className="border w-full p-4 flex justify-between items-center rounded-xl">
          <div className="text-sm">{username}</div>
          <LuLogOut
            onClick={handleLogout}
            className="h-6 text-red-500 w-6 hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col justify-center space-y-8 text-xl font-semibold  items-center pt-10">
          <Link to="/" className="text-[#5932EA]">
            Home
          </Link>
          <Link to="/user/course/" className="text-[#5932EA] ">
            My Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
