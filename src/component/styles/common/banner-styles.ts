import { BannerDivProps } from "../../../interfaces";
import styled from "styled-components";

export const BannerDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => !['bg_image'].includes(prop),
})<BannerDivProps>`
    border: 2px solid ${(prop) => prop.theme.colors.text};
    background-color: ${(prop) => prop.theme.colors.background_primary};
    color: ${(prop) => prop.$text_color};
    border-radius: 16px;
    box-sizing: border-box;
    padding: 1rem;

    display: flex;
    flex-direction: row;
    
    background-image: ${(prop) => prop.bg_image !== undefined && prop.bg_image !== null && prop.bg_image !== ""
        ? `linear-gradient(rgba(31, 36, 46, 0.2), rgba(31, 36, 46, 0.7), rgba(31, 36, 46, 0.45)), ${prop.bg_image}`
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
    @media (max-width: 768px) {
        display: block !important;
        > div {
            width: 100%;
            height: 100%;
            h2 {
                flex-grow: 1;   
            }
        }
    }
`;
