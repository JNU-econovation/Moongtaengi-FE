import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { QuickCreateStudy } from "./QuickCreateStudy";
import { InviteCode } from "./InviteCode";
import { useModalModeStore } from "../stores/useModalModeStore";

export const NavLayout = () => {
    const { modalMode } = useModalModeStore();

    return (
        <div className="h-screen bg-custom-bg text-white font-sans flex flex-col overflow-x-hidden">
            <Navbar />
            
            <main className="flex-1">
                <Outlet />
            </main>

            {modalMode === "createStudy" && <QuickCreateStudy />}
            {modalMode === "inviteCode" && <InviteCode />}
        </div>
    );
};