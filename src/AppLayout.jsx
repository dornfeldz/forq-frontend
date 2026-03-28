import { Outlet } from "react-router-dom";
import {UserButton} from "@clerk/clerk-react";

function AppLayout() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold tracking-wide">
                    Vestr
                </h1>
                <div className="text-sm text-zinc-400">
                    Dashboard
                </div>
                    <UserButton />
            </div>

            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
}

export default AppLayout;