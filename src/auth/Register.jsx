/* eslint-disable no-unused-vars */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../lib/firebase";

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userData.username;
    const email = userData.email;
    const password = userData.password;

    if (!username || !email || !password) {
      toast.error("All fields required");
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, {
        displayName: username,
      });
      toast.success("User created successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
      const errorCode = err.message.includes('auth/') ? err.message.split('auth/')[1] : err.message;
      const error = errorCode.slice(0, -2);
      toast.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-[#fff]">
      <Card className="w-3/4 sm:w-1/3 py-2 lg:py-4 rounded-xl text-white  shadow-2xl flex justify-center items-center">
        <div className="">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2 text-[#5932EA]">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center ">
              <div className="text-[#5932EA] grid items-center gap-4">
                <div className="flex flex-col w-[10rem] lg:w-[25rem] space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="name">Username</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Username"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name">Email</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Email address"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
                <button
                  type="submit"
                  className="sm:w-full w-[10rem] mt-6 rounded-lg p-2 bg-[#5932EA] text-[#fff]"
                >
                  Register
                </button>
                <p className="text-xs text-center pt-2 text-[#5932EA]">
                  Already have an account?{" "}
                  <span className="text-[#5932EA]">
                    <Link to="/login">Login</Link>
                  </span>
                </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default Register;
