import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@firebase/auth";
import { auth } from "@/firebaseAuth";
import { LoginForm, logIn, getConfig } from "@/features/admin";
import { onAuthStateChanged } from "firebase/auth";

type AuthStore = {
  user: User | null;
  config: {
    revalidationSecret?: string;
  } | null;
  logIn(email: string, password: string): Promise<User | undefined>;
};

export const AuthContext = createContext<AuthStore>({
  user: null,
  config: null,
  logIn: () => Promise.resolve(undefined),
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [config, setConfig] = useState<AuthStore["config"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (config || !user?.uid) {
      return;
    }

    const asyncEffect = async () => {
      const _config = await getConfig(user.uid);
      setConfig(_config);
    };
    asyncEffect();
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user, config, logIn }}>
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
