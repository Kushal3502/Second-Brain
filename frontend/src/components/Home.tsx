import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import Card from "./ui/Card";

interface Brain {
  link: string;
  type: string;
  title: string;
  description: string;
}

function Home() {
  const [brains, setBrains] = useState<Brain[]>([]);

  const { userId } = useUser();

  const fetchBrains = async () => {
    if (!userId) {
      toast.error("User ID not found!");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/user/${userId}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setBrains(response.data.brains);
    } catch (error: any) {
      console.error("Brain fetch error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchBrains();
  }, [userId]);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Brains</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brains &&
          brains.map((item, index) => <Card key={index} brain={item} />)}
      </div>
    </div>
  );
}

export default Home;
