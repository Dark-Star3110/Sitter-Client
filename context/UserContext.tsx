import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Account } from "../types";
import { request } from "../utils/api";

type Props = {
  children: ReactNode;
};

export type UserContextType = {
  isAuth: boolean;
  user: Account | null;
  setUser: (user: Account | null) => void;
  isLoading: boolean;
  error: any;
};

export const UserContext = createContext<UserContextType>({
  isAuth: false,
  user: null,
  setUser: () => {},
  isLoading: false,
  error: null,
});

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const retrieveUser = async () => {
    setLoading(true);
    try {
      const user = await request<Account | null>({
        method: "GET",
        path: "/api/user",
      });
      setUser(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isAuth: !!user,
      user,
      setUser,
      isLoading: loading,
      error,
    }),
    [user, loading, error]
  );

  useEffect(() => {
    retrieveUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
