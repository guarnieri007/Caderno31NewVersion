import React, { ReactElement } from "react";
import { BannerProps } from "@/component/interfaces"
import { Chip } from "../styles/common/common-styles";
import { BannerDiv } from "../styles/common/banner-styles";

export const Banner = ({ actionText, buttonText, image, text, title }: BannerProps): ReactElement => {
    return (
        <BannerDiv>
            <div>

                <Chip>
                    {title}
                </Chip>
                <h2>
                    {text}
                </h2>
                <a href="">
                    {buttonText}
                </a>
            </div>

        </BannerDiv>
    )
}