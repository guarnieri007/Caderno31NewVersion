import styled from "styled-components";

const description_lineHeight = 3.6;
const description_lineHeightUnit = "rem";
const description_lines = 2;

export interface ItemAsCardDivProps {
    $bg_image: string;
}

export const ItemAsCardDiv = styled.div<ItemAsCardDivProps>`
    background-color: ${(prop) => prop.theme.colors.button_text};
    color: ${(prop) => prop.theme.colors.text};
    border-radius: 16px 16px 0px 0px;
    padding: ${(prop) => prop.theme.spacings.small};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    
    .cardImage {
        background-image: ${(prop) => prop.$bg_image};
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        height:auto;
        border-radius: 8px 8px 0px 0px;
        background-color: ${(prop) => prop.theme.colors.background_primary};
        padding-top: 100%;
    }
    .cardData {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        .price {
            padding: 0px 16px;
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
            flex-grow: 1;
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
        margin-top: 24px;
        display: grid;
        grid-template-rows: ${description_lineHeight}${description_lineHeightUnit} 1.5rem 4rem;
        grid-template-areas:
        "title"
        "category"
        "contentCreator";
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
        }
        .contentCreator {
            grid-area: contentCreator;
            display: flex;
            flex-direction: row;
            gap: 8px;
            .profileImage {
                display:block;
                height:100%;
                width: 4rem;
                img {
                    border-radius: 8px;
                    height: 100%;
                    width: auto;
                }
            }
            .creatorsName {
                color: ${(prop) => prop.theme.colors.button_background};
                line-height: 4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                height:100%;
                width: 100%;
                flex-grow: 1;
                font-size: 1rem;
            }
        }
    }
`;