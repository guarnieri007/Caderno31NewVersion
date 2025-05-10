import { ReactElement } from "react";
import { BannerProps } from "../../interfaces"
import { Chip } from "../styles/common/common-styles";
import { BannerDiv } from "../styles/common/banner-styles";
import { Button } from "./button";

export const Banner = ({ text_button, image, text, title }: BannerProps): ReactElement => {
    return (
        <BannerDiv bg_image={image}>
            <div>
                <Chip>
                    {title}
                </Chip>
                <h2>
                    {text}
                </h2>
                    <Button color="primary">
                        {text_button}
                    </Button>
            </div>
        </BannerDiv>
    )
}