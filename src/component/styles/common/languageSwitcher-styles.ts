import styled from 'styled-components';

type LanguageSwitcherStylesProps = {
  isOpen: boolean;
  isHovered?: boolean;
}


export const LanguageSwitcherStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen', 'isHovered'].includes(prop),
})<LanguageSwitcherStylesProps>`
    position: relative;
    display: flex;
    gap: 8px;
    height: 100%;
    background-color: ${(prop) => prop.isOpen || prop.isHovered ? prop.theme.colors.primary_hover : 'none'};
    border-radius: ${(prop) => prop.theme.spacings.small};
    padding: 0px !important;
    cursor: pointer;
    
    .SelectedLanguage {
        padding: ${(prop) => prop.theme.spacings.min} ${(prop) => prop.theme.spacings.small};
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        height: 100%;
        color: ${(prop) => prop.isOpen || prop.isHovered ? prop.theme.colors.text_hover : prop.theme.colors.text};
    }
    
    .AvailableLanguages {
        display: ${(prop) => prop.isOpen ? "inline-flex" : "none"};
        flex-direction: column;
        padding: ${(prop) => prop.theme.spacings.small} ${(prop) => prop.theme.spacings.reduced};
        gap: ${(prop) => prop.theme.spacings.normal};
        background-color: ${(prop) => prop.theme.colors.background_secondary};
        border-radius: ${(prop) => prop.theme.spacings.min};
        position: absolute;
        top: calc(${(prop) => prop.theme.spacings.min} + 100%);
        left: 0px;
        z-index: 10;
        border: 2px solid ${(prop) => prop.theme.colors.border_default};
        border-radius: ${(prop) => prop.theme.borderRadius.small};

        .Language {
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            gap: ${(prop) => prop.theme.spacings.small};
            height: 100%;
            span {
                font-size: 14px;
            }
        }
    }



    @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
        height: auto;
    }
`
