import { BannerDivProps } from "@/component/interfaces";
import styled from "styled-components";

export const BannerDiv = styled.div<BannerDivProps>`
    border: 1px solid ${(prop) => prop.theme["text-color"]};
    background-color: ${(prop) => prop.theme["background-color"]};
    color: ${(prop) => prop.theme["text-color-hover"]};
    border-radius: 16px;
    box-sizing: border-box;
    padding: 1rem;

    display: flex;
    flex-direction: row;
    
    background-image: ${(prop) => prop.$bg_image
        ? `linear-gradient(rgba(31, 36, 46, 0.8), rgba(31, 36, 46, 0.8)), ${prop.$bg_image}`
        : null};
    
    background-position: right;
    background-size: cover;
    background-repeat: no-repeat;
    
    > div {
        display: flex;
        flex-direction: column;

        width: 60%;
        
        h2 {
            height:60px;
            height: auto;
            flex-grow: 1;
            font-size: 1.25rem;
            text-align: center;
        }
    }
`;
