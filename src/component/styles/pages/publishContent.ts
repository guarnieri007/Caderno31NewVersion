import styled from "styled-components";

export const PublishContentStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: ${({ theme }) => theme.spacings.big} 0px;

  .card_style {
    top: 92px;
    left: 220px;
    width: 1000px;
    height: auto;
    max-width: 90%;
    background-color: ${(prop) => prop.theme.colors.background_card};
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    align-self: center;
    box-sizing: border-box;

    padding: ${({ theme }) => `${theme.spacings.normal} ${theme.spacings.big}`};
    margin-top: ${({ theme }) => theme.spacings.normal};
  }

  .title_style {
    font-size: 2rem;
    padding: ${({ theme }) => `${theme.spacings.big} 0px`};

    @media (max-width: 768px) {
      font-size: 1.8rem;
      text-align: center
    }
  }

  form {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: ${({ theme }) => theme.spacings.normal};
  }
`;
