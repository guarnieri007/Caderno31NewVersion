import { ReactElement } from "react";
import { MiniBannerStyle } from "../styles/common/miniBannerStyle";
import { MiniBannerLayoutProps } from "../../interfaces/interfaces";

export const MiniBannerLayout = ({items}:MiniBannerLayoutProps ):ReactElement => {
    return (
        <MiniBannerStyle>
            {...items}
        </MiniBannerStyle>
    )
}