import { User } from "@firebase/auth";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginForm, logIn } from "@/features/admin";
import { auth } from "@/firebaseAuth";
import { collection, getDocs, query } from "firebase/firestore/lite";
import { db } from "@/firebase";

type AuthStore = {
  user: User | null;
  secret: string;
  logIn(email: string, password: string): Promise<User | undefined>;
};

const getSecret = async (userUid?: string) => {
  if (!userUid) {
    return "";
  }

  const col = collection(db, "editorConfig");
  const res = await getDocs(query(col));

  const config = res.docs[0];

  return config.data().revalidationSecret;
};

export const AuthContext = createContext<AuthStore>({
  user: null,
  secret: "",
  logIn: () => Promise.resolve(undefined),
});
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (secret || !user?.uid) {
      return;
    }

    const asyncEffect = async () => {
      const secret = await getSecret(user.uid);
      setSecret(secret);
    };
    asyncEffect();
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user, secret, logIn }}>
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
