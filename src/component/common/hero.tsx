import { ReactElement } from "react";
import { Button } from "./button";
import { HeroProps } from "../../interfaces/interfaces";
import { HeroHeader } from "../styles/common/common-styles";
import { useTheme } from "styled-components";




export const Hero = ({ title, text, text_button, handleClickButton, text_color, bg_color, image }: HeroProps): ReactElement => {
    const theme = useTheme();
    const fallback_text_color = text_color ?? theme.colors.hero_text;
    return (
        <HeroHeader
            bg_color={bg_color}
            bg_image={image}
            text_color={fallback_text_color}
            >
            <h1 className="noSelection">
                {title}
            </h1>
            <p className="noSelection">
                {text}
            </p>
            <Button color="primary" handleOnClick={handleClickButton}>
                {text_button}
            </Button>
        </HeroHeader>
    )
}
