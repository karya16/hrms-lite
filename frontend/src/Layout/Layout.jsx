import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 min-w-0 ml-0 sm:ml-[70px] lg:ml-[220px]">

        {/* Header */}
        <header className="px-6 py-4 bg-gray-900 border-b border-slate-800 flex justify-between items-center">

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="sm:hidden text-slate-300 text-xl"
          >
            ☰
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              K
            </div>
            <p className="text-sm font-semibold text-slate-200">Admin</p>
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