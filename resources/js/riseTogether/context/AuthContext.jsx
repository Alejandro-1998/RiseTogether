import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Initial check
    const [errors, setErrors] = useState([]);

    const csrf = () => axios.get("/sanctum/csrf-cookie");

    const getUser = async () => {
        try {
            const { data } = await axios.get("/api/user");
            setUser(data);
        } catch (e) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        await csrf();
        setErrors([]);
        try {
            await axios.post("/api/login", { email, password });
            await getUser(); // Fetch user to update state
            return true;
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            } else if (e.response && e.response.status === 401) {
                setErrors({ email: ["Credenciales incorrectas."] });
            } else {
                setErrors({ general: ["Error al iniciar sesión."] });
            }
            throw e;
        }
    };

    const register = async (data) => {
        await csrf();
        setErrors([]);
        try {
            await axios.post("/api/register", data);
            await getUser();
            return true;
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
            throw e;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (e) {
            console.error("Logout error:", e);
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isLoading,
                errors,
                getUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
