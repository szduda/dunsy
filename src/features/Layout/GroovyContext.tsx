import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  SnippetCard,
  getSnippets,
  readSnippets,
  writeSnippets,
} from '../SnippetApi'
import { useAuth } from '../admin'

type GroovyGarage = {
  cards: SnippetCard[]
  loading: boolean
}

const defaultContext = {
  cards: [],
  loading: true,
}

export const Context = createContext<GroovyGarage>(defaultContext)

export const useGrooves = () => useContext(Context)

type Props = {
  children: ReactNode
}

export const GroovyContext: FC<Props> = (props) => {
  const [cards, setCards] = useState<SnippetCard[]>(defaultContext.cards)
  const [loading, setLoading] = useState(defaultContext.loading)

  useEffect(() => {
    const lastFetchAt = Number(localStorage.getItem('lastFetchAt') ?? -1)
    const needRefetch = Date.now() > lastFetchAt + 24 * 3600 * 1000
    if (needRefetch) {
      const asyncEffect = async () => {
        const remoteData = await getSnippets(undefined, { limit: 100 })
        console.log(remoteData?.length, 'grooves fetched now')
        writeSnippets(remoteData)
        setCards(remoteData)
      }
      asyncEffect()
    } else {
      const localData = readSnippets()
      const when = new Date(lastFetchAt)
      const whenStr = `${when.getDate()}.${
        when.getMonth() + 1
      }|${when.getHours()}:${when.getMinutes()}`
      console.log(
        `${localData?.length} grooves from ${whenStr} read from local storage`
      )
      setCards(localData)
    }
    setLoading(false)
  }, [])

  return <Context.Provider value={{ cards, loading }} {...props} />
}
