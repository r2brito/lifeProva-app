import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

interface User {
  empwebcodigo: string;
  empwebnome: string;
  empweblogin: string;
  empwebstatus: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  empweblogin: string;
  empwebsenha: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@lifeRastreio:token",
        "@lifeRastreio:user",
      ]);

      if (token[1] && user[1])
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      setData({ token: token[1], user: JSON.parse(user[1]) });
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ empweblogin, empwebsenha }) => {
    const reponse = await api.post("login", { empweblogin, empwebsenha });

    const { token, user } = reponse.data;

    await AsyncStorage.multiSet([
      ["@lifeRastreio:token", token],
      ["@lifeRastreio:user", JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      "@lifeRastreio:token",
      "@lifeRastreio:user",
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}
