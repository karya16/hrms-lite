import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 ml-[220px]">

        {/* Header */}
        <header className="px-8 py-6 bg-gray-900 border-b border-slate-800 flex justify-end">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              K
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Admin</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}

export default Layout;