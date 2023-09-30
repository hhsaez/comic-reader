import { useCallback, useContext } from "react";
import { ReaderContext } from "../routes/Reader/ReaderContext";

export default function useGoToNextPage() {
  const { setContext } = useContext(ReaderContext);

  return useCallback(() => setContext((ctx) => {
    const { info: { pageCount }, currentPage, layout } = ctx;
    const advance = layout === "double-page" ? 2 : 1;
    return {
      ...ctx,
      currentPage: (currentPage < (pageCount - 1) ? currentPage + advance : currentPage),
    };
  }), [setContext]);
}
