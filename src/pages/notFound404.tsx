import { ReactElement } from "react";
import littleMonkey from "../assets/images/notFound/macaquito.png";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { Button } from "../component/common/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../i18n";

export const NotFound404 = (): ReactElement => {
    const navigate = useNavigate();
    const theme: DefaultTheme = useTheme();
    const { t } = useI18n();

    const NotFoundContainer = styled.div`
    width: "auto";
    height: "auto";
    margin: "0 auto";
    padding: ${(prop) => prop.theme.spacings.normal} ${(prop) => prop.theme.spacings["biger"]};

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
            <p style={title}>{t('pages.notFound404.title', undefined, 'Our top specialists are working hard to understand what happened')}</p>
            <p style={litleText}>{t('pages.notFound404.subtitle', undefined, 'Try going back to the previous page or accessing the homepage')}</p>
            <div style={{ display: "block", margin: "0 auto", width: "fit-content" }}>
                <div style={{ display: "inline-flex", gap: "16px" }}>

                    <Button
                        children={t('pages.notFound404.homeButton', undefined, 'Home page')}
                        color="primary"
                        handleOnClick={GoToHomePage}
                    />
                </div>
            </div>
        </NotFoundContainer>
    )
}
