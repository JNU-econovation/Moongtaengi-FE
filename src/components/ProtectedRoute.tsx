
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore"

export const ProtectedRoute = () => {
    const {isLogin} = useAuthStore();

    if (!isLogin) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}