import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { SnippetCard, readSnippets } from "../SnippetApi";

type GroovyGarage = {
  cards: SnippetCard[];
};

export const Context = createContext<GroovyGarage>({
  cards: [],
});

export const useGrooves = () => useContext(Context);

type Props = {
  initialData: SnippetCard[] | null;
  children: ReactNode;
};

export const GroovyContext: FC<Props> = ({ initialData = [], ...props }) => {
  const [cards, setCards] = useState(initialData ?? []);

  useEffect(() => {
    if (initialData === null) {
      const localData = readSnippets();
      setCards(localData);
    }
  }, []);

  return <Context.Provider value={{ cards }} {...props} />;
};
