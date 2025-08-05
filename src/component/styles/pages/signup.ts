import { BannerDivProps } from "../../../interfaces";
import styled from "styled-components";

export const SignUpPage = styled.div<BannerDivProps>`
    .grid_div {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row: 1fr;
        align-items: center;
    }
    
    .photo {
        box-sizing: border-box;
        padding: ${(prop) => prop.theme.spacings["main-padding"]};
        padding-bottom: ${(prop) => prop.theme.spacings.normal};
        background-image: url(${(prop) => prop.bg_image});
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        flex-grow: 1;
        box-sizing: border-box;
    }
    .form {
        box-sizing: border-box;
        padding: ${(prop) => prop.theme.spacings["main-padding"]};
        background-color: ${(prop) => prop.theme.colors.background_secondary};
        height: 100%;
        
        h1 {
            color: ${(prop) => prop.theme.colors.text_hover};
            font-size: 48px;
            font-weight: 700;
            line-height: 56px;
            text-align: center;
            padding: 0px;
            margin: 0px;
            margin-top: ${(prop) => prop.theme.spacings["main-padding"]};
        }
        h2 {
            color: ${(prop) => prop.theme.colors.text_hover};
            font-size: 14px;
            
            line-height: 18px;
            text-align: center;
            padding: 0px;
            margin-top: 8px;
        }
        .termsContainer {
            display: flex;
            flex-direction: column;
            gap: 0px;
            div {
                display: flex;
                flex-direction: row;
                align-items: center;
                input[type="checkbox"] {
                    margin: 0px;
                    margin-left: 8px;
                    width: 24px;
                    height: 24px;
                    flex-grow: 0;
                }
                .terms {
                    flex-grow: 1;
                    box-sizing: border-box;
                    padding-left: 16px;
                    color: ${(prop) => prop.theme.colors.text_hover};
                }
            }
            .error {
                margin: 0px;
                padding: 0px;
                display: block;
                width: 100%;
                height: auto;
                color: ${(prop) => prop.theme.colors.error};
                text-align: center;
            }
        }
        
        button {
            margin-top: 24px;
        }
    }
    @media (max-width: 768px) {
        .grid_div {
            grid-template-columns: 1fr;
            grid-row: auto auto;
        }
        .photo {
            padding: ${(prop) => prop.theme.spacings.normal};
            width: auto;
            height: 300px;
            background-size: contain;
            display: block;
        }
        .form {
            padding: ${(prop) => prop.theme.spacings["main-padding"]};
            h1 {
                margin-top: ${(prop) => prop.theme.spacings.min};
            }
        }
    }
    `