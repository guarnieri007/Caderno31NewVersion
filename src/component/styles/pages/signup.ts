import styled from "styled-components";

export const SignUpPage = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .photo {
        padding: ${(prop) => prop.theme.spacings["main-padding"]};
    }
    .form {
        padding: ${(prop) => prop.theme.spacings["main-padding"]};

        h1 {
            color: ${(prop) => prop.theme.colors.white};
            font-size: 48px;
            font-weight: 700;
            line-height: 56px;
            text-align: center;
            padding: 0px;
            margin: 0px;
        }
        h2 {
            color: ${(prop) => prop.theme.colors.white};
            font-size: 14px;
            font-family: "Roboto";
            line-height: 18px;
            text-align: center;
            padding: 0px;
            margin-top: 8px;
        }
    }
`