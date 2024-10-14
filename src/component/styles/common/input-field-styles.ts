import styled from "styled-components";

export const InputFieldContent = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 32px auto;
    
    label {
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 16px;
        box-sizing: border-box;
        padding: 0px 16px;
        color: ${(prop) => prop.theme.colors["text-color-hover"]};
        
        
    }
    .input-holder {
        position: relative;
        height: auto;
        width: 100%;
        z-index: 2;
        
        input[type="text"] {
            height: 48px;
            width: calc(100% - 64px);
            border: 1px solid ${(prop) => prop.theme.colors["button-text-color"]};
            box-sizing: content-box;
            background-color: ${(prop) => prop.theme.colors["background-color"]};
            color: ${(prop) => prop.theme.colors["text-color-hover"]};
            font-size: 16px;
            outline: none;
            border-radius: 8px;
            padding: 0px 48px 0px 16px;
            
            &:focus {
                background-color: ${(prop) => prop.theme.colors["background-secondary"]};
                border: solid 1px ${(prop) => prop.theme.colors["text-color-hover"]};
                color: ${(prop) => prop.theme.colors["text-color-hover"]};
            }
    
            ::placeholder {
                color: ${(prop) => prop.theme.colors["placeHolder-color"]};
            }    
        }
        svg {
            position: absolute;
            right: 16px;
            bottom: 15px;
        }

    }

    .instructions {
        display: block;
        width: 100%;
        will-change: max-height;
        transform: translateY(-4px);
        z-index: 1;
        overflow: hidden;
        transition: max-height 400ms ease-in-out;
        tr {
            display: block;
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            background-color: ${(prop) => prop.theme.colors["background-color"]};
            li {
                padding: 0px 8px;
                margin: 0px 16px;
                color: ${(prop) => prop.theme.colors["text-color-hover"]};
            }
        }
    }

`