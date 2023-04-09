import styled from "styled-components";

interface SearchBarContainerProps {
    searchPerformed: boolean;
}

export const SearchBarContainer = styled.div<SearchBarContainerProps>`
    position: ${({ searchPerformed }) => (searchPerformed ? "fixed" : "absolute")};
    top: ${({ searchPerformed }) => (searchPerformed ? "50px" : "50%")};
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 600px;
    z-index: 10;
`;
