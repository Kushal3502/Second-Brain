import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

function Dashboard() {
  return (
    <div className="flex h-screen gap-8">
      <Sidebar />
      <main className="w-full h-full bg-gray-900 p-4 m-6 ml-60 rounded-lg">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
