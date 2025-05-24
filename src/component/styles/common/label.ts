import styled from "styled-components";

interface LabelStyleProps {
    is_focused: boolean;
}


export const LabelStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['is_focused'].includes(prop),
})<LabelStyleProps>`

    
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
                color: ${(prop) => prop.is_focused ? prop.theme.colors.text_hover : prop.theme.colors.text};
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
`