import styled from "styled-components";

export const PostTypeCheckboxStyle = styled.div`
  width: 100%;
  height: auto;

  .options {
    display: flex;
    padding: 0px;
    flex-wrap: wrap;
    gap: ${(prop) => prop.theme.spacings.normal};
  }

  .option {
    user-select: none; // evita selecao
    display: flex;
    align-items: center;
    gap: ${(prop) => prop.theme.spacings.min};
    padding: 0 15px;
    border-radius: ${(prop) => prop.theme.spacings.small};
    cursor: pointer;
    border: 1px solid transparent;

    &.selected {
      background-color: ${(prop) => prop.theme.colors.background_secondary};
      border: ${(prop) => prop.theme.colors.button_text_hover} 1px solid;
    }

    &.inactive {
      opacity: 0.6;
      //pointer-events: none;
      cursor: not-allowed;
    }

    input[type='checkbox'] {
      appearance: none;
      border-radius: ${(prop) => prop.theme.borderRadius.small};
      border: 1px solid ${(prop) => prop.theme.colors.border_default};
      width: 20px;
      height: 20px;
      margin: 0;
      cursor: pointer;
      accent-color: ${(prop) => prop.theme.colors.primary};

      &:hover {
      accent-color: ${(prop) => prop.theme.colors.primary_hover};
      }
    }

    input[type="checkbox"]:checked::after {
      content: "✔";
      color: ${(prop) => prop.theme.colors.text};
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      font-size: 9px;
    }
  }
`;
