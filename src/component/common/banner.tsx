import React, { ReactElement } from "react";
import { BannerProps } from "@/component/interfaces"
import styles from "@/component/common/input.module.scss"

export const Banner = ({ actionText, buttonText, image, text, title }: BannerProps): ReactElement => {
    return (
        <div>
            <div>

                <p className={styles.chip}>
                    {title}
                </p>
                <h2>
                    {text}
                </h2>
                <a href="">
                    {buttonText}
                </a>
            </div>

        </div>
    )
}