import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import Button from "../components/ui/Button";
import { Plus, Share2 } from "lucide-react";
import Popup from "../components/ui/Popup";
import { useUser } from "../context/UserContext";

function Dashboard() {
  const [popUp, setPopUp] = useState(false);
  const { username, userId } = useUser();

  console.log(userId, username);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <nav className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Second Brain</h1>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Share2 className="h-4 w-4 mr-2" />
            Share Brain
          </Button>
          <Button onClick={() => setPopUp(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Brain
          </Button>
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gray-900 p-6 m-6 rounded-lg overflow-auto">
          {popUp && <Popup title="Demo" onClose={() => setPopUp(false)} />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
