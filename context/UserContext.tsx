import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Account, Parent, Sitter } from "../types";
import { request } from "../utils/api";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

type AccountWithProfile = Account & {
  parent?: Parent;
  sitter?: Sitter;
};

export type UserContextType = {
  isAuth: boolean;
  user: AccountWithProfile | null;
  setUser: (user: AccountWithProfile | null) => void;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
  error: any;
};

export const UserContext = createContext<UserContextType>({
  isAuth: false,
  user: null,
  setUser: () => {},
  setIsAuth: () => {},
  isLoading: false,
  error: null,
});

export const UserContextProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<AccountWithProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const retrieveUser = async () => {
    try {
      setLoading(true);
      const res = await request<{
        account: Account;
        parent?: Parent;
        sitter?: Sitter;
      } | null>({
        method: "GET",
        path: "/account/me",
      });
      if (res && !res.parent && !res.sitter) {
        setUser({ ...res.account });
        router.push("/profile");
      } else if (res) {
        setUser({
          ...res.account,
          parent: res.parent,
          sitter: res.sitter,
        });
      } else {
        setUser(null);
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      setUser(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      isAuth,
      user,
      setUser,
      isLoading: loading,
      error,
      setIsAuth,
    }),
    [user, loading, error, isAuth]
  );

  useEffect(() => {
    retrieveUser();
  }, [isAuth]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
