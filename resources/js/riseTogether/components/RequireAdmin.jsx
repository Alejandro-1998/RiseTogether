
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAdmin = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }

    // Check if user exists and has the 'admin' role
    // Since roles_list is an array of strings like ['admin', 'user']
    const isAdmin = user?.roles_list?.includes('admin');

    if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default RequireAdmin;
