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
`

export const FooterContainer = styled.div`
    
    box-sizing: border-box;
    height: auto;
    min-height: 40px;
    width: 100%;
    background-color: ${(prop) => prop.theme.colors.background_primary};
    padding: 0px;

    .footerContainer {
        display: flex;
        flex-direction: row;
        gap: 0px;
        height: auto;

        .footerLeft {
            padding: ${(prop) => prop.theme.spacings.normal} 0px;
            padding-bottom: 0px;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            width: 100%;
            flex-wrap: nowrap;
            height: auto;
            border-right: 1px dashed ${(prop) => prop.theme.colors.text};
            
            .top {
                width: 100%;
                height: auto;
                text-align: center;
                flex-grow: 1;
                border-bottom: 1px dashed ${(prop) => prop.theme.colors.text};
                h1 {
                    color: ${(prop) => prop.theme.colors.text_hover};
                    font-size: 20px;
                    font-family: "Gelasio";
                    font-weight: 500;
                    line-height: 30px;
                    margin: 0px;
                    align-self: center;
                }
                p {
                    align-self: center;
                    color: ${(prop) => prop.theme.colors.text};
                    font-size: 12px;
                    font-family: "Gelasio";
                    font-weight: 300;
                    line-height: 16px;
                    margin: 0px;
                }
            }

            .bottom {
                width: 100%;
                height: auto;
                
                text-align: center;
                align-content: center;
                border-top: 1px dotted ${(prop) => prop.theme.colors.text};
                span {
                    display: block;
                    color: ${(prop) => prop.theme.colors.text};
                    font-size: 12px;
                    font-family: "Gelasio";
                    font-weight: 300;
                    line-height: ${(prop) => prop.theme.spacings.normal};
                    padding: ${(prop) => prop.theme.spacings.min} 0px;
                }
                
            }
        }

        .footerRight {
            padding: ${(prop) => prop.theme.spacings.normal} ${(prop) => prop.theme.spacings["main-padding"]};
            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 8px;
            border-left: 1px dotted ${(prop) => prop.theme.colors.text_hover}; 

            a {
                color: ${(prop) => prop.theme.colors.button_background};
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

    @media (max-width: 768px) {
        max-width: 100%;
        flex-direction: column;
        padding: 12px ${(prop) => prop.theme.spacings.normal};
        .right {
            align-items: flex-end;
            top: 10px;
            height: auto;
            width: 100%;
            flex-direction: row !important;
            :first-child {
                margin-right: auto;
            }

            :last-child {
                margin-left: auto;
            }
        }
        .left {
            display: flex;
        }
    }

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
    background-color: ${(prop) => prop.theme.colors.background_primary};
    border-bottom: solid ${(prop) => prop.theme.colors.button_text_hover} 3px;

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
                fill: ${(prop) => prop.theme.colors.text};
            }
            &.active svg {
                fill: ${(prop) => prop.theme.colors.text_hover};
            }

            .title {
                color: ${(prop) => prop.theme.colors.text};
                font-size: 20px;
                font-family: "Gelasio";
                font-weight: 800;
                line-height: 26px;
            }

            &.active .title {
                color: ${(prop) => prop.theme.colors.text_hover};
            }
        }


        a {
            color: ${(prop) => prop.theme.colors.text};
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
                color: ${(prop) => prop.theme.colors.primary};
            }

            &:hover:after, &:focus::after {
                content: "";
                position: absolute;
                bottom: -6px;
                left: 0px;
                width: 100%;
                height: 2px;
                background-color: ${(prop) => prop.theme.colors.button_text_hover};
            }
        }
        a.active {
            color: ${(prop) => prop.theme.colors.text_hover};
        }
    }

    .right {

        display: inherit;
        flex-direction: inherit;
        align-items: inherit;
        gap: inherit;
    }
`;