import styled from "styled-components";

export const MakeLoginStyle = styled.div`

        background: ${(prop) => prop.theme.colors.background_secondary};
        padding: 2rem;
        border-radius: 10px;
        width: min(333px, calc(70%));
        position: relative;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: ${(prop) => prop.theme.spacings["main-padding"]};
        max-height: 80dvh;
        overflow-x: auto;

    .closeButton {
        background: transparent;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 5px 10px;
        margin-left: auto;
        display: block;
        font-size: 18px;
        cursor: pointer;
        color: ${(prop) => prop.theme.colors.text};
        line-height: 18px;

        &:hover {
            background: ${(prop) => prop.theme.colors.background_primary};
        }
    }

    .formStyle {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .centerFlexItems {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .paragraph {
        font-size: ${(prop) => prop.theme.spacings.reduced};
        text-align: center;
        margin-top: 15px;
    }

`