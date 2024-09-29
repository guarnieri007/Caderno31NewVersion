import styled from "styled-components";

export const MainContainer = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100dvh;
    height: auto;
`;

export const ContentContainer = styled.main`

    font-family: "Gelasio";
    flex-grow: 1;
    line-height: 150%;
    width: 100%;
    box-sizing: border-box;
    padding: 0px;
    padding-bottom: 42px;
`

export const FooterContainer = styled.div`
    
    box-sizing: border-box;
    height: auto;
    min-height: 40px;
    width: 100%;
    background-color: ${(prop) => prop.theme.colors["background-color"]};
    padding: 12px ${(prop) => prop.theme.spacings["main-padding"]};

    .footerContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;

        .footerLeft {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: normal;

            h1 {
                color: #ffffff;
                font-size: 20px;
                font-family: "Gelasio";
                font-weight: 500;
                line-height: 30px;
                margin: 0px;
                align-self: center;
            }
            p {
                align-self: center;
                color: #ffffff;
                font-size: 12px;
                font-family: "Gelasio";
                font-weight: 300;
                line-height: 16px;
                margin: 0px;
            }
            div {
                flex-grow: 1;
                margin-top: 32px;
                span {
                    color: #ffffff;
                    font-size: 12px;
                    font-family: "Gelasio";
                    font-weight: 300;
                    line-height: 16px;
                }
                
            }
        }

        .footerRight {
            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 8px;

            a {
                color: #ffffff;
                font-size: 12px;
                font-family: "Gelasio";
                font-weight: 500;
                line-height: 16px;
                text-align: right;
            }
            
        }
    }

`

export const HeaderComponent = styled.header`

    //position: sticky;
    z-index: 1;
    top: 0px;
    box-sizing: border-box;
    padding: 12px ${(prop) => prop.theme.spacings["main-padding"]};
    gap: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    //min-height: 96px;
    height: auto;
    background-color: ${(prop) => prop.theme.colors["background-color"]};
    border-bottom: solid ${(prop) => prop.theme.colors["button-text-color_hover"]} 3px;

    .left {
        display: inherit;
        flex-direction: inherit;
        align-items: inherit;
        gap: inherit;
        flex-grow: 1;


        .logo {
            display: flex;
            flex-direction: row;
            gap: 8px;
            align-items: center;

            svg {
                fill: ${(prop) =>prop.theme.colors["text-color"]};
            }
            &.active svg {
                fill: ${(prop) =>prop.theme.colors.white};
            }

            .title {
                color: ${(prop) =>prop.theme.colors["text-color"]};
                font-size: 20px;
                font-family: "Gelasio";
                font-weight: 800;
                line-height: 26px;
            }

            &.active .title {
                color: ${(prop) =>prop.theme.colors.white};
            }
        }


        a {
            color: ${(prop) =>prop.theme.colors["text-color"]};
            font-size: 16px;
            font-family: "Gelasio";
            font-weight: 500;
            line-height: 22px;
            position: relative;
            text-decoration: none;

            &:focus {
                outline: none;
                box-shadow: none;
            }

            .active {
                color: ${(prop) =>prop.theme.colors["primary-color"]};
            }

            &:hover:after, &:focus::after {
                content: "";
                position: absolute;
                bottom: -6px;
                left: 0px;
                width: 100%;
                height: 2px;
                background-color: ${(prop) => prop.theme.colors["button-text-color_hover"]};
            }
        }
        a.active {
            color: ${(prop) =>prop.theme.colors.white};
        }
    }

    .right {

        display: inherit;
        flex-direction: inherit;
        align-items: inherit;
        gap: inherit;
    }
`;