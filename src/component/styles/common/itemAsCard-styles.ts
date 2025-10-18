import styled from "styled-components";

const description_lineHeight = 3.6;
const description_lineHeightUnit = "rem";
const description_lines = 2;

export interface ItemAsCardDivProps {
    bg_image: string;
}

export const ItemAsCardDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => !['bg_image'].includes(prop),
})<ItemAsCardDivProps>`
    background-color: ${(prop) => prop.theme.colors.background_secondary};
    color: ${(prop) => prop.theme.colors.text};
    border-radius: 16px;
    padding: 2px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    
    .cardImage {
        background-image: ${(prop) => prop.bg_image};
        border-radius: 16px 16px 8px 8px !important;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        height: 200px;
        width: 100%;
        max-height: 200px;
        border-radius: 8px 8px 0px 0px;
        background-color: ${(prop) => prop.theme.colors.background_primary};
    }
    .cardData {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .price {
            height: auto;
            min-height: 76px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.15rem;
            line-height: 32px;
        }
        .cardAmountInfo {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            margin: 0px;
            gap: 16px;
            min-height: 32px;
            height: auto;
            div{
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                gap: 2px;
                width: min-content;
                img {
                    width:24px;
                    height:auto;
                }
                span {
                    color: ${(prop) => prop.theme.colors.text};
                    width: auto;
                    height: auto;
                    line-height: 32px;
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
            font-size: 1.15rem;
            color: ${(prop) => prop.theme.colors.text_hover};
            align-self: baseline;
            display: -webkit-box;               /* Usa o layout flexível baseado em caixas */
            -webkit-box-orient: vertical;       /* Orienta as caixas verticalmente */
            overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
            text-overflow: ellipsis;            /* Exibe os três pontinhos */
            -webkit-line-clamp: ${description_lines};              /* Limita a exibição a x linhas */
            line-height: ${description_lineHeight/2}${description_lineHeightUnit};                   /* Define a altura da linha para ajustar a altura da div */
            max-height: ${(description_lineHeight /2)* description_lines}${description_lineHeightUnit};        /* Altura máxima permitida com base nas linhas */
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
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            .profileImage {
                display:flex;
                align-items: center;
                justify-content: center;
                height:initial;
                width: 4rem;
                img {
                    border-radius: 8px;
                    height: 100%;
                    max-height: 64px;
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