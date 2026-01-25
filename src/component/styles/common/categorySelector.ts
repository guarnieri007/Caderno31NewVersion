import styled from "styled-components";

interface CategorySelectorStyleProps {
  is_focused: boolean,
}

export const CategorySelectorStyle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['is_focused'].includes(prop),
})<CategorySelectorStyleProps>`
  margin-top: 0rem;
  width: 100%;
  height: auto;

  .dropdown {
    position: relative;
    width: 100%;
    div div p {
      margin: 0;
    }
  }

  .dropdown-header {
  background-color: ${(prop) => prop.is_focused ? prop.theme.colors.background_secondary : prop.theme.colors.background_primary};
  padding: 0rem ${(prop) => prop.theme.spacings.normal};
  border: ${(prop) => prop.is_focused ? "2px" : "1px"} solid ${(prop) => prop.is_focused ? prop.theme.colors.text_hover : prop.theme.colors.button_text};
  border-radius: 8px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  input {
    padding-right: ${(prop) => prop.theme.spacings.normal} !important;
    background: transparent;
    padding: 0px;
    margin: 0px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 1rem;
    flex: 1;
    width: 100%;
    font-family: inherit;
    height: 48px;


    &::placeholder {
      color: #aaa;
    }

    &:disabled {
      cursor: not-allowed;
      color: #555;
    }
  }

  .icon {
  margin: 0px;
  padding: 0px;
  display: flex;
  align-items: center;
  cursor: pointer;

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    }
}


  .dropdown-list {
    background-color: ${(prop) => prop.theme.colors.background_card};
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
    border: 2px solid ${(prop) => prop.theme.colors.text_hover};
    border-radius: 8px;
    position: absolute;
    width: 100%;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;

    li {
      padding: 0.75rem 1rem;
      cursor: pointer;
      color: #fff;

      &:hover {
        background-color: ${(prop) => prop.theme.colors.background_primary};
      }
    }
  }

  .chip-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.75rem;
    gap: 0.5rem;
  }

  .chip {
    background-color: #4e5767;
    color: #fff;
    padding: 0.2rem 0.5rem;
    padding-right: 0.3rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    text-align: right;
    gap: 2px;


    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      margin-left: 0rem;
      cursor: pointer;
      font-weight: bold;
    }
  }
  .warning {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${(prop) => prop.theme.spacings.small} 0px;
  }
`;
