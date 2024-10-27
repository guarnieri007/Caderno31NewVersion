import styled from "styled-components";

interface InputFieldArguments {
    isFocused: boolean,
    hasErrors: boolean,
}

export const InputFieldContent = styled.div<InputFieldArguments>`
    .holder {
        margin: ${(prop) => prop.theme.spacings.min} 0px;
    }
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    .characters {
        p{
            font-size: 11px;
            text-align: right;
            margin: 4px;
            margin-right: 16px;
            color: ${(prop) => prop.isFocused ? prop.theme.colors.text_hover : prop.theme.colors.placeHolder};
        }
    }
    
    label {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 16px;
        box-sizing: border-box;
        padding: 0px 16px;
        color: ${(prop) => prop.theme.colors.text_hover};
        
        
    }
    .input-holder {
        position: relative;
        height: auto;
        width: 100%;
        z-index: 2;
        
        input[type="text"], input[type="password"] {
            height: 48px;
            width: calc(100% - 64px);
            border: 2px solid ${(prop) => prop.hasErrors ? prop.theme.colors.error : prop.theme.colors.button_text};
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
        }
        svg {
            position: absolute;
            right: 16px;
            //the proper math is, the svg height, minus the element height, the difference we should add the padding and border, divide by 2. In my case, I have 18px
            bottom: 18px;
            top: 18px;
            fill: ${(prop) => prop.isFocused ? prop.theme.colors.text_hover : prop.theme.colors.text};
        }

    }

    .expand {
        will-change: max-height, margin-bottom;
        max-height: ${(prop) => prop.isFocused ? "400px" : "0px"};
    }

    .instructions {
        display: block;
        width: 100%;
        margin-top: 0px;
        z-index: 1;
        overflow: hidden;
        box-sizing: border-box;
        transition: max-height 300ms ease-in-out, margin 350ms ease-in-out;

        tr {
            display: block;
            width: 100%;
            padding: ${(prop) => prop.theme.spacings.min};
            box-sizing: border-box;
            background-color: ${(prop) => prop.theme.colors.background_primary};
            li {
                padding: 0px 8px;
                margin: 0px 16px;
                color: ${(prop) => prop.theme.colors.text_hover};
            }
        }
    }

    .errors {
        height: auto;
        color: ${(prop) => prop.theme.colors.error};
        padding: ${(prop) => prop.theme.spacings.min};
        box-sizing: border-box;
        background-color: ${(prop) => prop.theme.colors.background_secondary};
        li {
            text-decoration: dashed;
            font-size: 12px;
            margin-left: ${(prop) => prop.theme.spacings.normal};
        }
    }

`