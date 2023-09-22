import {
  FC,
  ReactNode,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SnippetCard,
  getSnippets,
  readSnippets,
  writeSnippets,
} from "../SnippetApi";

type GroovyGarage = {
  cards: SnippetCard[];
};

export const Context = createContext<GroovyGarage>({
  cards: [],
});

export const useGrooves = () => useContext(Context);

type Props = {
  children: ReactNode;
};

export const GroovyContext: FC<Props> = (props) => {
  const [cards, setCards] = useState<SnippetCard[]>([]);

  useEffect(() => {
    const lastFetchAt = Number(localStorage.getItem("lastFetchAt") ?? -1);
    const needRefetch = Date.now() > lastFetchAt + 24 * 3600 * 1000;
    if (needRefetch) {
      const asyncEffect = async () => {
        const remoteData = await getSnippets(undefined, { limit: 1000 });
        console.log(remoteData?.length, "grooves fetched");
        writeSnippets(remoteData);
        setCards(remoteData);
      };
      asyncEffect();
    } else {
      const localData = readSnippets();
      const when = new Date(lastFetchAt);
      console.log(
        localData?.length,
        "grooves from",
        `${when.getDate()}.${when.getMonth()} ${when.getHours()}:${when.getMinutes()}`,
        "read from local storage"
      );
      setCards(localData);
    }
  }, []);

  return <Context.Provider value={{ cards }} {...props} />;
};

const getCookie = (name: string) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.replace(`${name}=`, "");
