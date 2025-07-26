import styled from "styled-components";

export const PostTypeCheckboxStyle = styled.div`
  width: 100%;
  height: auto;

  .options {
    display: flex;
    flex-wrap: wrap;
    gap: ${(prop) => prop.theme.spacings.small};
  }

  .option {
    display: flex;
    align-items: center;
    gap: ${(prop) => prop.theme.spacings.min};
    padding: ${(prop) => prop.theme.spacings.min};
    border-radius: 4px;

    &.selected {
      background-color: ${(prop) => prop.theme.colors.background_secondary};
    }

    &.inactive {
      opacity: 0.5;
      pointer-events: none;
    }

    input[type='checkbox'] {
      width: 20px;
      height: 20px;
      margin: 0;
    }
  }
`;
