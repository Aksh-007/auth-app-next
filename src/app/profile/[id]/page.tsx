"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage({ params }: any) {
  const [data, setData] = useState("Nothing");
  const router = useRouter();
  // function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.error("Logout Failed", error);
      if (error.response && error.response.status === 400) {
        // Username or email already exists error
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else if (error.response && error.response.status === 500) {
        // Server error
        toast.error("An error occurred during Logout. Please try again later.");
      } else {
        // Generic error message
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // user deatils method by extracting information from token
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res?.data);
      setData(res?.data?.data?._id);
    } catch (error: any) {
      console.error("Details Extraction Failed", error);
      if (error.response && error.response.status === 400) {
        // Username or email already exists error
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else if (error.response && error.response.status === 500) {
        // Server error
        toast.error("An error occurred during Logout. Please try again later.");
      } else {
        // Generic error message
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <section className="container p-6 text-center text-2xl flex flex-col   justify-center items-center h-[100vh]">
        <h1>Profile Page </h1>
        <hr />
        <br />
        <h1 className="text-2xl">
          {data === "Nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h1>
        {/* <p>Username : {data?.username}</p> */}
        <br />
        <button className="bg-blue-500 p-3 rounded-md" onClick={handleLogout}>
          Logout
        </button>
        <br />
        <button className="bg-blue-500 p-3 rounded-md" onClick={getUserDetails}>
          get Details
        </button>
      </section>
    </>
  );
}
