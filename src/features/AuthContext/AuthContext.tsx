import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import Image from 'next/image'
import { User } from '@firebase/auth'
import { auth } from '@/firebaseAuth'
import { LoginForm, logIn, getConfig, getUserData } from '@/features/admin'
import { onAuthStateChanged } from 'firebase/auth'

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
  }, [user?.uid])

  return (
    <AuthContext.Provider value={{ user, userData, config, logIn }}>
      {loading ? (
        <div className='fixed top-0 left-0 right-0 h-screen text-3xl font-black flex flex-col items-center justify-center p-4 tracking-widest text-center'>
          <div className='relative w-[450px] h-[450px]'>
            <Image
              fill
              sizes='(max-width: 767px) 100%, 450px'
              placeholder='blur'
              blurDataURL='fallback.jpeg'
              className='rounded-lg object-cover object-bottom'
              src={'/hotpot-ai/loader.png'}
              quality={80}
              alt='Dundunin The Guardian'
            />
          </div>
          <div className='mt-32 pt-1 animate-pulse'>Loading...</div>
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
