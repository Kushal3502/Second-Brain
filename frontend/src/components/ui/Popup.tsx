import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PopupProps {
  onClose: () => void;
  title: string;
  className?: string;
}

const contentTypes = [
  { value: "audio", label: "Audio" },
  { value: "video", label: "Video" },
  { value: "tweet", label: "Tweet" },
  { value: "document", label: "Document" },
];

const Popup: React.FC<PopupProps> = ({ title, onClose, className = "" }) => {
  const [formData, setFormData] = useState({
    link: "",
    type: contentTypes[0].value,
    title: "",
    description: "",
  });

  const handleBrain = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Brain added");
        onClose();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Brain error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleBrain}
        className={`bg-gray-900 rounded-lg p-6 w-full max-w-md relative ${className}`}
      >
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
        <div className="space-y-4">
          <Input
            name="link"
            label="Link"
            placeholder="Enter link URL"
            value={formData.link}
            onChange={handleInputChange}
          />
          <Select
            name="type"
            label="Type"
            options={contentTypes}
            value={formData.type}
            onChange={handleInputChange}
          />
          <Input
            name="title"
            label="Title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Input
            name="description"
            label="Description"
            placeholder="Enter description"
            type="textarea"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            onClick={onClose}
            className="bg-red-600 text-white hover:bg-red-700 transition px-4 py-2 rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
