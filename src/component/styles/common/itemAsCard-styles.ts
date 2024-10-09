import styled from "styled-components";

export interface ItemAsCardDivProps {
    $bg_image: string;
}

export const ItemAsCardDiv = styled.div<ItemAsCardDivProps>`
    background-color: ${(prop) => prop.theme.colors["button-text-color"]};
    color: ${(prop) => prop.theme.colors["text-color"]};
    border-radius: 16px 16px 0px 0px;
    box-sizing:border-box;
    padding: 16px;
    .cardImage {
        background-image: ${(prop) => prop.$bg_image};
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        height:auto;
        border-radius: 8px 8px 0px 0px;
        background-color: ${(prop) => prop.theme.colors["background-color"]};
        padding-top: 100%;
    }
    .cardData {
        margin-top: 16px;
        left: 24px;
        right: 24px;
        bottom: 12px;
        display: flex;
        flex-direction: column;
        .price {
            padding: 0px 16px;
            font-size: 1.15rem;
            line-height: 32px;
        }
        .cardAmountInfo {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: auto;
            margin: 0px auto;
            gap: 16px;
            height: 32px;
            div{
                display: flex;
                flex-direction: row;
                align-items: center;
                align-content: center;
                gap: 2px;
                width: auto;
                height: 100%;
                img {
                    width:24px;
                    height:auto;
                }
                span {
                    color: ${(prop) => prop.theme.colors["text-color"]};
                    width: auto;
                    height: 100%;
                    line-height: 32px;
                }
            }
        }
    }

    .description {
        margin-top: 24px;
        display: grid;
        grid-template-rows: 3.6rem 1.5rem 4rem;
        grid-template-areas:
        "title"
        "category"
        "contentCreator";
        gap: 4px;
        .title {
            grid-area: title;
            font-size: 1.25rem;
            color: ${(prop) => prop.theme.colors["text-color-hover"]};
            align-self: baseline;
            display: -webkit-box;               /* Usa o layout flexível baseado em caixas */
            -webkit-box-orient: vertical;       /* Orienta as caixas verticalmente */
            overflow: hidden;                   /* Esconde o texto que exceder o tamanho */
            text-overflow: ellipsis;            /* Exibe os três pontinhos */
            -webkit-line-clamp: 2;              /* Limita a exibição a 3 linhas */
            line-height: 1.8rem;                   /* Define a altura da linha para ajustar a altura da div */
            max-height: calc(1.8rem * 2);        /* Altura máxima permitida com base nas linhas */
            text-align: center;
        }
        .category {
            align-self: center;
            grid-area: category;
            font-size: 0.95rem;
            line-height: 1.5rem;
            color: ${(prop) => prop.theme.colors["button-background-color"]};
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
                color: ${(prop) => prop.theme.colors["button-background-color"]};
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