import { useCallback, useContext } from "react";
import { ReaderContext } from "../routes/Reader/ReaderContext";

export default function useGoToPrevPage() {
  const { setContext } = useContext(ReaderContext);

  return useCallback(() => setContext((ctx) => {
    const { currentPage, layout } = ctx;
    const advance = layout === "double-page" ? 2 : 1;
    return {
      ...ctx,
      currentPage: (currentPage > 0 ? currentPage - advance : currentPage),
    };
  }), [setContext]);
}
