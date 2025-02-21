import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../core/config/Firebase";
import { AuthContext } from "./auth";
import { getUser } from "../../core/services/AuthService";
import { User } from "../../types/Auth";
import { getInitialTheme } from "../../utils/Helper";
import { Theme } from "../../types/Settings";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark" as Theme);
    } else {
      document.documentElement.classList.remove("dark" as Theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const changeUserName = (newName: string) => {
    if (user) {
      setUser({ ...user, userName: newName });
    }
  };
  const changePhotoUrl = (newPhotoUrl: string) => {
    if (user) {
      setUser({ ...user, photoURL: newPhotoUrl });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        toggleTheme,
        theme,
        changePhotoUrl,
        changeUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
