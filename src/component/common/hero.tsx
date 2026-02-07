import { ReactElement } from "react";
import { Button } from "./button";
import { HeroProps } from "../../interfaces";
import { HeroHeader } from "../styles/common/common-styles";



export const Hero = ({ title, text, text_button, handleClickButton, bg_color, image }: HeroProps): ReactElement => {
    return (
        <HeroHeader
            bg_color={bg_color}
            bg_image={image}>
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
