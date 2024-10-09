import { BannerDivProps } from "@/component/interfaces";
import styled from "styled-components";

export const SignUpPage = styled.div<BannerDivProps>`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row: 1fr;
    align-items: center;

    .photo {
        padding: ${(prop) => prop.theme.spacings["main-padding"]};
        background-image: url(${(prop) => prop.$bg_image});
        background-color: "#acd";
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        flex-grow: 1;
    }
    .form {
        padding: ${(prop) => prop.theme.spacings["main-padding"]};

        h1 {
            color: ${(prop) => prop.theme.colors["text-color-hover"]};
            font-size: 48px;
            font-weight: 700;
            line-height: 56px;
            text-align: center;
            padding: 0px;
            margin: 0px;
        }
        h2 {
            color: ${(prop) => prop.theme.colors["text-color-hover"]};
            font-size: 14px;
            font-family: "Roboto";
            line-height: 18px;
            text-align: center;
            padding: 0px;
            margin-top: 8px;
        }
        .termsContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
            input[type="checkbox"] {
                margin: 0px;
                margin-left: 8px;
                width: 24px;
                height: 24px;
            }
            .terms {
                box-sizing: border-box;
                padding-left: 16px;
                color: ${(prop) => prop.theme.colors["text-color-hover"]};
            }
        }

        button {
            margin-top: 24px;
        }
    }
`