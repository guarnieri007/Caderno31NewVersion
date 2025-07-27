import styled from "styled-components";

export const PostTypeCheckboxStyle = styled.div`
  width: 100%;
  height: auto;

  .options {
    display: flex;
    padding: 0px ${(prop) => prop.theme.spacings.normal};
    flex-wrap: wrap;
    gap: ${(prop) => prop.theme.spacings.normal};
  }

  .option {
    user-select: none; // evita selecao
    display: flex;
    align-items: center;
    gap: ${(prop) => prop.theme.spacings.min};
    padding: ${(prop) => prop.theme.spacings.min} ${(prop) => prop.theme.spacings.small};
    border-radius: ${(prop) => prop.theme.spacings.small};
    cursor: pointer;

    &.selected {
      background-color: ${(prop) => prop.theme.colors.background_secondary};
    }

    &.inactive {
      opacity: 0.6;
      //pointer-events: none;
      cursor: not-allowed;
    }

    input[type='checkbox'] {
      width: 20px;
      height: 20px;
      margin: 0;
      margin-right: ${(prop) => prop.theme.spacings.min};
      cursor: pointer;
    }
  }
`;
