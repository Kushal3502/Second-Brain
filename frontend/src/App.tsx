import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useUser } from "./context/UserContext";

function App() {
  const navigate = useNavigate();
  const { setUserInfo } = useUser();

  const fetchAuthStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/auth`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data?.success) {
        const { username, _id } = response.data.user;
        setUserInfo(username, _id);
        navigate("/");
      } else {
        navigate("/auth/signin");
      }
    } catch (error: any) {
      console.error("Error fetching auth status:", error);
      navigate("/auth/signin");
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
