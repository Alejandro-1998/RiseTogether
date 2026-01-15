import { useAuthContext } from "../context/AuthContext";

export default function useAuth() {
    const context = useAuthContext();
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    // Mapping context to the interface we used before + new methods
    return {
        user: context.user,
        isAuth: !!context.user,
        isLoading: context.isLoading,
        login: context.login,
        register: context.register,
        logout: context.logout,
        errors: context.errors
    };
}
