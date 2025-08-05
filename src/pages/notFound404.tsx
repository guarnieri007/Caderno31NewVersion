import { ReactElement } from "react";
import littleMonkey from "../assets/images/notFound/macaquito.png";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { Button } from "../component/common/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const NotFound404 = (): ReactElement => {
    const navigate = useNavigate();
    const theme: DefaultTheme = useTheme();

    const NotFoundContainer = styled.div`
    width: "auto";
    height: "auto";
    margin: "0 auto";
    padding: ${(prop) => prop.theme.spacings.normal} ${(prop) => prop.theme.spacings["main-padding"]};

    @media (max-width: 768px) {
        .content {
            padding: ${(prop) => prop.theme.spacings.normal};
        }
    }
    `

    const title: React.CSSProperties = {
        color: theme.colors.text_hover,
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '24px',
        textAlign: 'center',
    }

    const litleText: React.CSSProperties = {
        color: '#ffffff',
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
    }

    const imageProps: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        maxWidth: 'min(400px, 100%)',
        height: 'auto',
    }

    function GoToHomePage() {
        navigate("/");
    }


    return (
        <NotFoundContainer>
            <img src={littleMonkey} style={imageProps} />
            <p style={title}>All of our best specialists are working hard to understand what happened.</p>
            <p style={litleText}>Try to get back or go to the home page.</p>
            <div style={{ display: "block", margin: "0 auto", width: "fit-content" }}>
                <div style={{ display: "inline-flex", gap: "16px" }}>

                    <Button
                        children={"Home page"}
                        color="primary"
                        handleOnClick={GoToHomePage}
                    />
                </div>
            </div>
        </NotFoundContainer>
    )
}