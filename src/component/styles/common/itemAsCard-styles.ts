import styled from "styled-components";
import { withAlpha } from "../../../helper/colors";

const description_lineHeight = 3.6;
const description_lineHeightUnit = "rem";
const description_lines = 2;

export interface ItemAsCardDivProps {
    bg_image: string;
}

export const ItemAsCardDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => !['bg_image'].includes(prop),
}) <ItemAsCardDivProps>`
    background-color: ${(prop) => prop.theme.colors.background_secondary};
    color: ${(prop) => prop.theme.colors.text};
    border-radius: 16px;
    padding: 2px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.3);
    
    .cardImage {
        background-image: ${(prop) => `linear-gradient(${withAlpha(prop.theme.colors.background_primary, 0.0)},
        ${withAlpha(prop.theme.colors.background_primary, 0.0)},
        ${withAlpha(prop.theme.colors.background_secondary, 0.5)}), ${prop.bg_image}`};
        border-radius: 16px 16px 8px 8px !important;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        height: 265px;
        width: 100%;
        max-height: 265px;
        border-radius: 8px 8px 0px 0px;
        background-color: ${(prop) => prop.theme.colors.background_primary};
        
        .cardData {
            display: flex;
            flex-direction: column;
            height: 100%;
            .price {
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: 0px;
                justify-content: baseline;
                font-size: 1.15rem;
                line-height: 32px;
                padding: ${(prop) => prop.theme.spacings.small};

                .categories {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    justify-content: start;
                    align-items: flex-start;
                }

                div {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    justify-content: end;
                    align-items: flex-end;
                }
            }
            .cardAmountInfo {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                width: 100%;
                margin-top: auto;
                padding: ${(prop) => prop.theme.spacings.small};
                gap: 0px;
                min-height: 32px;
                height: auto;
                div{
                    background-color: ${(prop) => withAlpha(prop.theme.colors.background_secondary, 0.85)};
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-content: center;
                    padding: 6px 8px;
                    gap: 2px;
                    width: min-content;
                    border-top: 1px solid ${(prop) => prop.theme.colors.border_default};
                    border-bottom: 1px solid ${(prop) => prop.theme.colors.border_default};
                    &:first-child {
                        border-left: 1px solid ${(prop) => prop.theme.colors.border_default};
                        border-top-left-radius: ${(prop) => prop.theme.spacings.small};
                        border-bottom-left-radius: ${(prop) => prop.theme.spacings.small};
                    }
                    &:last-child {
                        border-right: 1px solid ${(prop) => prop.theme.colors.border_default};
                        border-top-right-radius: ${(prop) => prop.theme.spacings.small};
                        border-bottom-right-radius: ${(prop) => prop.theme.spacings.small};
                    }
                    img {
                        width:24px;
                        height:auto;
                    }
                    span {
                        color: ${(prop) => prop.theme.colors.text};
                        width: auto;
                        height: auto;
                        line-height: 1rem;
                    }
                }
            }
        }
    }
    
    .description {
        margin: 0px;
        padding: ${(prop) => prop.theme.spacings.small};
        display: grid;
        flex-grow: 1;
        grid-template-rows: auto auto auto;
        grid-template-areas:
        "title"
        "contentCreator"
        "category";
        gap: ${(prop) => prop.theme.spacings.reduced};
        .title {
            grid-area: title;
            font-size: 1rem;
            color: ${(prop) => prop.theme.colors.text_hover};
            align-self: baseline;
            display: -webkit-box;               /* Usa o layout flexível baseado em caixas */
            -webkit-box-orient: vertical;       /* Orienta as caixas verticalmente */
            overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
            text-overflow: ellipsis;            /* Exibe os três pontinhos */
            -webkit-line-clamp: ${description_lines};              /* Limita a exibição a x linhas */
            line-height: ${description_lineHeight / 2}${description_lineHeightUnit};                   /* Define a altura da linha para ajustar a altura da div */
            max-height: ${(description_lineHeight / 2) * description_lines}${description_lineHeightUnit};        /* Altura máxima permitida com base nas linhas */
            text-align: center;
        }
        .category {
            align-self: center;
            grid-area: category;
            font-size: 0.95rem;
            line-height: 1.5rem;
            color: ${(prop) => prop.theme.colors.button_background};
            text-align: center;
        }
        .contentCreator {
            grid-area: contentCreator;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 0px;
            .profileImage {
                display:flex;
                align-items: center;
                justify-content: center;
                height:initial;
                img {
                    border-radius: 8px;
                    height: 100%;
                    max-height: 60px;
                    width: auto;
                }
            }
            .creatorsName {
                color: ${(prop) => prop.theme.colors.text};
                line-height: 1.1;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                height:auto;
                width: 100%;
                flex-grow: 1;
                font-size: 1rem;
                text-align: center;
            }
        }
    }
`;