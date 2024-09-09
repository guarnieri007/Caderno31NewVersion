import React, { ReactElement } from "react";
import { HeroHeader } from "@/component/common/common-styles";
import { Button } from "./inputs";
import { HeroProps } from "@/component/interfaces";



export const Hero = ({ title, text, buttonText, handleClickButton, bgColor, image }: HeroProps): ReactElement => {
    return (
        <HeroHeader
            bgColor={bgColor}
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
