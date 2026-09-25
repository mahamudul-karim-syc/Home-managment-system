
import { createContext, useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authuser, setAuthuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("hossing_tocken");

  useEffect(() => {
    const fetchUser = async () => {
      // Token নেই
      if (!token) {
        setAuthuser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BaseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || "Failed to fetch user");
        }

        // User পাওয়া গেছে
        setAuthuser(data);
      } catch (error) {
        console.log("Auth Error:", error);

        // Token invalid/expired হলে logout
        localStorage.removeItem("hossing_tocken");
        setAuthuser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("hossing_tocken");
    setAuthuser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authuser,
        setAuthuser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

