import styled from "styled-components";

interface InputFieldArguments {
    is_focused: boolean,
    has_errors: boolean,
}

export const InputFieldContent = styled.div.withConfig({
    shouldForwardProp: (prop) => !['has_errors', 'is_focused'].includes(prop),
})<InputFieldArguments>`
    .holder {
        margin: ${(prop) => prop.theme.spacings.normal} 0px;
    }
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    
    .input-holder {
        position: relative;
        height: auto;
        width: 100%;
        z-index: 2;
        
        input[type="text"], input[type="password"], input[type="email"], input[type="number"] {
            height: 48px;
            width: calc(100% - 64px);
            border: 2px solid ${(prop) => prop.theme.colors.button_text};
            box-sizing: content-box;
            background-color: ${(prop) => prop.theme.colors.background_primary};
            color: ${(prop) => prop.theme.colors.text_hover};
            font-size: 16px;
            outline: none;
            border-radius: 8px;
            padding: 0px 48px 0px 16px;
            
            &:focus {
                background-color: ${(prop) => prop.theme.colors.background_secondary};
                border: solid 2px ${(prop) => prop.theme.colors.text_hover};
                color: ${(prop) => prop.theme.colors.text_hover};
            }
    
            &::placeholder {
                color: ${(prop) => prop.theme.colors.placeHolder};
            }
            &:focus::placeholder {
                color: ${(prop) => prop.theme.colors.placeHolder_focus};
            }
        }
        svg {
            position: absolute;
            right: 16px;
            //the proper math is, the svg height, minus the element height, the difference we should add the padding and border, divide by 2. In my case, I have 18px
            bottom: 18px;
            top: 18px;
            fill: ${(prop) => prop.has_errors ? prop.theme.colors.error
            : prop.is_focused ? prop.theme.colors.text_hover
            : prop.theme.colors.text
            };
        }

    }

    .expand {
        will-change: max-height, margin-bottom;
        max-height: ${(prop) => prop.is_focused ? "400px" : "0px"};
    }

    .instructions {
        display: block;
        width: 100%;
        margin-top: 0px;
        z-index: 1;
        overflow: hidden;
        box-sizing: border-box;
        transition: max-height 400ms ease-in-out, margin 450ms ease-in-out;
        border: solid 2px ${(prop) => prop.is_focused ? prop.theme.colors.button_text : "transparent"};
        margin-top: ${(prop) => prop.is_focused ? prop.theme.spacings.small : "0px"};
        
        tr {
            display: block;
            width: 100%;
            padding: ${(prop) => prop.theme.spacings.small} ${(prop) => prop.theme.spacings.normal};
            box-sizing: border-box;
            background-color: ${(prop) => prop.theme.colors.background_primary};
            li {
                padding: 0px 8px;
                margin: 0px 16px;
                color: ${(prop) => prop.theme.colors.text_hover};
                font-size: ${(prop) => prop.theme.spacings.reduced};
                font-weight: 500;
            }
        }
    }
    
    .errors {
        height: auto;
        padding: ${(prop) => prop.theme.spacings.min} 18px;
        box-sizing: border-box;
        background-color: ${(prop) => prop.theme.colors.background_secondary};
        border: solid 2px ${(prop) => prop.theme.colors.button_text};
        margin-top: ${(prop) => prop.theme.spacings.small};
        li {
            text-decoration: dashed;
            color: ${(prop) => prop.theme.colors.error};
            margin-left: ${(prop) => prop.theme.spacings.normal};
            padding-left: ${(prop) => prop.theme.spacings.min};
            span {
                padding-left: ${(prop) => prop.theme.spacings.min};
                font-weight: 500;
                font-size: ${(prop) => prop.theme.spacings.reduced};
                color: ${(prop) => prop.theme.colors.text};
                
            }
        }
    }

`