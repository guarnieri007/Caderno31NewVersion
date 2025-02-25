import styled from "styled-components";

interface InputFieldArguments {
    isFocused: boolean,
    hasErrors: boolean,
}

export const InputFieldContent = styled.div<InputFieldArguments>`
    .holder {
        margin: ${(prop) => prop.theme.spacings.normal} 0px;
    }
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    .label-holder {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 8px;
        padding-bottom: ${(prop) => `${(Number(prop.theme.spacings.small.replace("px", "")) / 2)}px`};
        
        .characters {
            display: inline-block;
            width: auto;
            flex-grow: 1;
            padding-right: ${(prop) => prop.theme.spacings.normal};
            align-self: center;
            p{
                font-size: 11px;
                text-align: right;
                margin: 4px;
                margin-right: 16px;
                color: ${(prop) => prop.isFocused ? prop.theme.colors.text_hover : prop.theme.colors.text};
                display: block;
                width: 100%;
            }
        }
        
        label {
            align-self: center;
            font-size: 14px;
            box-sizing: border-box;
            padding: 0px 16px;
            color: ${(prop) => prop.theme.colors.text_hover};
            
            
        }
    }
    .input-holder {
        position: relative;
        height: auto;
        width: 100%;
        z-index: 2;
        
        input[type="text"], input[type="password"] {
            height: 48px;
            width: calc(100% - 64px);
            border: 1px solid ${(prop) => prop.theme.colors.button_text};
            box-sizing: content-box;
            background-color: ${(prop) => prop.theme.colors.background_primary};
            color: ${(prop) => prop.theme.colors.text_hover};
            font-size: 16px;
            outline: none;
            border-radius: 8px;
            padding: 0px 48px 0px 16px;
            
            &:focus {
                background-color: ${(prop) => prop.theme.colors.background_secondary};
                border: solid 1px ${(prop) => prop.theme.colors.text_hover};
                color: ${(prop) => prop.theme.colors.text_hover};
            }
    
            &::placeholder {
                color: ${(prop) => prop.theme.colors.text};
            }    
        }
        svg {
            position: absolute;
            right: 16px;
            //the proper math is, the svg height, minus the element height, the difference we should add the padding and border, divide by 2. In my case, I have 18px
            bottom: 18px;
            top: 18px;
            fill: ${(prop) => prop.hasErrors ? prop.theme.colors.error : prop.isFocused ? prop.theme.colors.text_hover : prop.theme.colors.text};
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
        transition: max-height 400ms ease-in-out, margin 450ms ease-in-out;
        border: solid 1px ${(prop) => prop.isFocused ? prop.theme.colors.button_text : "transparent"};
        margin-top: ${(prop) => prop.isFocused ? prop.theme.spacings.small : "0px"};
        
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
            }
        }
    }
    
    .errors {
        height: auto;
        color: ${(prop) => prop.theme.colors.error};
        padding: ${(prop) => prop.theme.spacings.min};
        box-sizing: border-box;
        background-color: ${(prop) => prop.theme.colors.background_secondary};
        border: solid 1px ${(prop) => prop.theme.colors.button_text};
        margin-top: ${(prop) => prop.theme.spacings.small};
        li {
            text-decoration: dashed;
            font-size: 12px;
            margin-left: ${(prop) => prop.theme.spacings.normal};
        }
    }

`