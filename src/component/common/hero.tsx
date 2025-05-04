import { ReactElement } from "react";
import { Button } from "./button";
import { HeroProps } from "../../interfaces";
import { HeroHeader } from "../styles/common/common-styles";



export const Hero = ({ title, text, buttonText, handleClickButton, bgcolor, image }: HeroProps): ReactElement => {
    return (
        <HeroHeader
            bgcolor={bgcolor}
            imagebg={image}>
            <h1>
                {title}
            </h1>
            <p>
                {text}
            </p>
            <Button color="primary" handleOnClick={handleClickButton}>
                {buttonText}
            </Button>
        </HeroHeader>
    )
}
