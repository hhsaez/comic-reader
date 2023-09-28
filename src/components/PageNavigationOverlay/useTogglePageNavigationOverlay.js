import { useCallback, useContext } from "react";
import { ReaderContext } from "../../routes/Reader/ReaderContext";

export default function useTogglePageNavigationOverlay() {
  const { setContext } = useContext(ReaderContext);
  return useCallback(() => {
    setContext((prev) => ({
      ...prev,
      showOverlay: !prev.showOverlay,
    }));
  }, [setContext]);
}

