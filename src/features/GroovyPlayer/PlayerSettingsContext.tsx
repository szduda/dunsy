import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type PlayerSettingsContext = {
  videoSync: boolean;
  setVideoSync(on: boolean): void;
  largeBars: boolean;
  setLargeBars(on: boolean): void;
};

export const Context = createContext<PlayerSettingsContext>({
  videoSync: false,
  setVideoSync: () => null,
  largeBars: false,
  setLargeBars: () => null,
});

export const usePlayerSettings = () => useContext(Context);

export const PlayerSettingsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [videoSync, setVideoSync] = useBooleanSetting("videoSync");
  const [largeBars, setLargeBars] = useBooleanSetting("largeBars");

  return (
    <Context.Provider
      value={{
        videoSync,
        setVideoSync,
        largeBars,
        setLargeBars,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useBooleanSetting = (name: string) => {
  const [value, setValueState] = useState(false);

  const setValue = (on: boolean) => {
    setValueState(on);
    setSetting(name, on);
  };

  useEffect(() => {
    const existingValue = getSetting(name) === String(true);
    setValueState(existingValue);
  }, []);

  return [value, setValue] as const;
};

const getSetting = (setting: string) =>
  window.localStorage.getItem(`groovyPlayer:${setting}`);

const setSetting = (setting: string, value: unknown) =>
  window.localStorage.setItem(`groovyPlayer:${setting}`, String(value));
