import {
  useState,
  useCallback,
  useContext,
  createContext,
  useMemo,
  useEffect,
  useRef,
} from 'react';

const HuntingContext = createContext({
  setPage: () => {},
  getInstance: () => {},
  getMetaData: () => {},
  clearMetaDataCache: () => {},
});

export function HuntingProvider({ instance: instanceProp, children }) {
  const [instance] = useState(() => instanceProp);

  const getInstance = useCallback(() => instance, [instance]);
  const setPage = useCallback((location) => instance.setPage(location), [instance]);
  const getMetaData = useCallback(() => instance.getAllMetaData(), [instance]);
  const clearMetaDataCache = useCallback(() => instance.clearCache(), [instance]);

  const value = useMemo(
    () => ({ setPage, getInstance, getMetaData, clearMetaDataCache }),
    [setPage, getInstance, getMetaData, clearMetaDataCache]
  );
  return <HuntingContext.Provider value={value}>{children}</HuntingContext.Provider>;
}

export function useHunting() {
  const context = useContext(HuntingContext);
  if (context === undefined) {
    throw new Error('useHunting must be used within a HuntingProvider');
  }

  return context;
}

export function useRegisterInputHunting(name) {
  const ref = useRef(null);
  const hunting = useHunting();

  useEffect(() => {
    const instance = hunting.getInstance();
    if (instance.formHunting && ref.current) {
      instance.formHunting.register(ref.current, name);
    }
  }, [hunting.getInstance]);

  return ref;
}
