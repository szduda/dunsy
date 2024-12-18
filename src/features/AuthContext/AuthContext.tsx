import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { User } from '@firebase/auth'
import { auth } from '@/firebaseAuth'
import { LoginForm, logIn, getConfig, getUserData } from '@/features/admin'
import { onAuthStateChanged } from 'firebase/auth'
import { Loader } from '@/features/Layout/Loader'

type UserData = {
  name?: string
  isEditor?: boolean
  isAdmin?: boolean
}

type RoleConfig = {
  revalidationSecret?: string
}

type AuthStore = {
  user: User | null
  userData: UserData | null
  config: RoleConfig | null
  logIn(email: string, password: string): Promise<User | undefined>
}

export const AuthContext = createContext<AuthStore>({
  user: null,
  userData: null,
  config: null,
  logIn: () => Promise.resolve(undefined),
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<AuthStore['userData']>(null)
  const [user, setUser] = useState<AuthStore['user']>(auth.currentUser)
  const [config, setConfig] = useState<AuthStore['config']>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!user?.uid) {
      return
    }

    if (!userData) {
      const asyncEffect = async () => {
        const userData = await getUserData(user.uid)
        setUserData(userData)
      }
      asyncEffect()
    }

    if (userData?.isAdmin && !config) {
      const asyncEffect = async () => {
        const _config = await getConfig(user.uid)
        setConfig(_config)
        if (_config) {
          localStorage.setItem("Trust me I'm a writer", 'true')
        }
      }
      asyncEffect()
    }
  }, [user?.uid, userData?.isAdmin])

  const ctxMemo = useMemo(
    () => ({ user, userData, config, logIn }),
    [user?.uid, Boolean(userData), Boolean(config)]
  )

  return (
    <AuthContext.Provider value={ctxMemo}>
      {loading ? (
        <div className='opacity-50 fixed inset-0'>
          <Loader />
        </div>
      ) : user ? (
        children
      ) : (
        <main className='flex min-h-screen mx-auto justify-center px-2 pt-2 md:pt-8 pb-8 max-w-[1024px]'>
          <LoginForm />
        </main>
      )}
    </AuthContext.Provider>
  )
}
