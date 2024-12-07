import React from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

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

const modalItems = [
  {
    label: "Link",
    element: <Input label="Link" placeholder="Enter link URL" />,
  },
  {
    label: "Type",
    element: <Select label="Type" options={contentTypes} />,
  },
  {
    label: "Title",
    element: <Input label="Title" placeholder="Enter title" />,
  },
  {
    label: "Description",
    element: (
      <Input
        label="Description"
        placeholder="Enter description"
        type="textarea"
      />
    ),
  },
];

const Popup: React.FC<PopupProps> = ({ title, onClose, className = "" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-gray-900 rounded-lg p-6 w-full max-w-md relative ${className}`}
      >
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
        <div className="space-y-4">
          {modalItems.map((item, index) => (
            <div key={index}>{item.element}</div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            onClick={onClose}
            className=" bg-red-600 text-white hover:bg-red-700 transition"
          >
            Cancel
          </Button>
          <Button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
