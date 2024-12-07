import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

interface SignupFormData {
  username: string;
  password: string;
}

function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Signup successful!");
        navigate("/auth/signin");
      } else {
        toast.error(response.data.message || "Signup failed!");
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create a new account
        </h1>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <Input
              label="Username"
              placeholder="Enter your username"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <Button className="w-full mt-6">Sign up</Button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/signin")}
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-300"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
