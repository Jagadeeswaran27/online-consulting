import { createContext } from "react";
import { User } from "../../types/Auth";
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
