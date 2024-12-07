import { useState } from "react";
import { House, LogOut, Newspaper, Twitter, Video } from "lucide-react";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    icon: <House />,
    label: "Home",
    path: "",
  },
  {
    icon: <Twitter />,
    label: "Tweets",
    path: "tweet",
  },
  {
    icon: <Video />,
    label: "Videos",
    path: "video",
  },
  {
    icon: <Newspaper />,
    label: "Documents",
    path: "documents",
  },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Logged out");
        navigate("/auth/signin");
      } else {
        toast.error(response.data.message || "Logout failed!");
      }
    } catch (error: any) {
      console.error("Logout error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className=" fixed bg-gray-900 text-gray-300 h-screen p-4 md:w-56 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-white">Second Brain</h1>
        <div>
          {sidebarItems.map((item, index) => (
            <div className="mb-2" key={index}>
              <Button
                variant={activeTab === item.label ? "primary" : "secondary"}
                className={`w-full ${
                  activeTab === item.label ? "font-bold text-white" : ""
                }`}
                onClick={() => {
                  setActiveTab(item.label);
                  navigate(`/${item.path}`);
                }}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full bg-red-600 text-white hover:bg-red-700 transition"
        onClick={handleLogout}
      >
        <LogOut />
        Log out
      </Button>
    </div>
  );
}

export default Sidebar;
