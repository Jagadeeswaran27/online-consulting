import { createContext } from "react";
import { User } from "../../types/Auth";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  theme: string;
  toggleTheme: () => void;
  changeUserName: (newName: string) => void;
  changePhotoUrl: (newPhotoUrl: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  theme: "light",
  toggleTheme: () => {},
  changeUserName: () => {},
  changePhotoUrl: () => {},
});
