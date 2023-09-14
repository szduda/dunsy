import { User } from "@firebase/auth";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginForm, logIn } from "..";
import { auth } from "@/firebase";

type AuthStore = {
  user: User | null;
  logIn(email: string, password: string): Promise<User | undefined>;
};

export const AuthContext = createContext<AuthStore>({
  user: null,
  logIn: () => Promise.resolve(undefined),
});
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn }}>
      {loading ? (
        <div className="fixed top-0 left-0 right-0 h-screen text-3xl font-black flex items-center justify-center p-4 tracking-widest text-center">
          Loading...
        </div>
      ) : user ? (
        children
      ) : (
        <main className="flex min-h-screen mx-auto justify-center px-2 pt-2 md:pt-8 pb-8 max-w-[1024px]">
          <LoginForm />
        </main>
      )}
    </AuthContext.Provider>
  );
};
