// /src/component/styles/common/upload-styles.ts
import styled from "styled-components";

export const UploadItemsHolder = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 16px;

    @media (min-width: 769px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
