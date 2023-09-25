import { useCallback, useContext } from "react";
import styled from "styled-components";
import { ReaderContext } from "../../routes/Reader/ReaderContext";

const SInteractionContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const SInteractionArea = styled.div`
  display: flex;
  min-width: 100px;
  height: 100%;
  flex-grow: 1;
`;

export function PageNavigationOverlay(props) {
  const { setCurrentPage, pageCount, advance } = props;
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev < (pageCount - 1) ? prev + advance : prev);
  }, [setCurrentPage, pageCount, advance]);
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => prev > 0 ? prev - advance : prev);
  }, [setCurrentPage, advance]);

  const { setContext } = useContext(ReaderContext);

  const toggleSidebar = useCallback(() => {
    setContext((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        open: !prev.sidebar.open,
      }
    }));
  }, [setContext]);

  return (
    <SInteractionContainer>
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={prevPage} />
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", flexGrow: 4 }} onClick={toggleSidebar} />
      <SInteractionArea style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={nextPage} />
    </SInteractionContainer>
  );
}
