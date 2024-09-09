import styled from "styled-components";

export const BannerDiv = styled.div`
    border: 1px solid ${(prop) => prop.theme["background-color"]};
    background-color: ${(prop) => prop.theme["button-text-color"]};
    border-radius: 16px;
    box-sizing: border-box;
    padding: 1rem;
`