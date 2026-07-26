import styled from "styled-components";

export const PublishContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: ${({ theme }) => theme.spacings["biger"]} 0px;

  & .card_style {
    top: 92px;
    left: 220px;
    width: 1000%;
    height: auto;
    min-height: 400px;
    max-width: 90%;
    background-color: ${(prop) => prop.theme.colors.background_primary};
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    align-self: center;
    box-sizing: border-box;

    padding: ${({ theme }) => `${theme.spacings.normal} ${theme.spacings.big}`};
    margin-top: ${({ theme }) => theme.spacings.normal};
  }

  & .title_style {
    font-size: 2rem;
    padding: ${({ theme }) => `${theme.spacings.big} 0px`};

    @media (max-width: 768px) {
      font-size: 1.8rem;
      text-align: center
    }
  }

  & form {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    row-gap: ${({ theme }) => theme.spacings.big};
  }

  & .input-descriptions {
    width: 100%;
    & > button {
      display: block;
      margin-left: auto;
    }
    & .description-inputs {
      display: flex;
      flex-direction: column;
      row-gap: ${({ theme }) => theme.spacings.biger};
      margin-top: ${({ theme }) => theme.spacings.small};
    }
    & .description-item {
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: ${({ theme }) => theme.spacings.normal};
      align-items: flex-start;
    }

    & .description-item > *:first-child {
      grid-column: 1 / -1;  /* ocupa da primeira até a última coluna */
    }

    & .remove-description {
      background: none;
      border: none;
      margin: 0px auto;
      margin-top: 40px;
      cursor: pointer;
      padding: 0px;
      position: relative;
      height: 40px;
      display: flex;
      width: 100%;

      & button {
          width: 100%;
          display: flex;
          height: auto;
        & span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      & button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    & .lang-selector {
      display: flex;
      padding: 0px;      
      height: auto;
      flex-direction: column;
      margin: 0px;
      box-sizing: border-box;
      color: ${({ theme }) => theme.colors.text_hover};
      gap: 0px;
      
      & label {      
         line-height: 200%;
      }

      & > div {
      gap: 0px;
      }

      & select {
        height: 48px;
        width: min-content;
        border: 1px solid ${({ theme }) => theme.colors.button_text};
        box-sizing: content-box;
        background-color: ${({ theme }) => theme.colors.background_primary};
        color: ${({ theme }) => theme.colors.text_hover};
        outline: none;
        border-radius: 8px;
        padding: 1px 4px 1px 8px;
      }
    }
    & .input-item {
      flex: 1;
      & .input-holder, p, label, .characters, > div {
      padding: 0px;
      }
      & p {
        margin: 0px;
        }
        & label {
          padding-bottom: 4px;
          }
    }
  }
`;
