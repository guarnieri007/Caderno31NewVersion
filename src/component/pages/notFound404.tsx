import { ReactElement } from "react";
import macaquito from "../../assets/images/notFound/macaquito.png";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { Button } from "../common/button";
import { useNavigate } from "react-router-dom";

export const NotFound404 = (): ReactElement => {
    const navigate = useNavigate();
    const theme: DefaultTheme = useTheme();

    const container: React.CSSProperties = {
        width: "auto",
        height: "auto",
        margin: "0 auto",
    }

    const title: React.CSSProperties = {
        color: theme.colors.text_hover,
        fontSize: '20px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        lineHeight: '24px',
        textAlign: 'center',
    }

    const litleText: React.CSSProperties = {
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Roboto',
        lineHeight: '19px',
        textAlign: 'center',
    }

    const imageProps: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
        maxWidth: '400px',
        height: 'auto',
    }

    function GoToHomePage() {
        navigate("/");
    }


    return (
        <div style={container}>
            <img src={macaquito} style={imageProps} />
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
        </div>
    )
}