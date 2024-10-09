import React, { ReactNode } from "react"
import { ReactElement } from "react"
import { ButtonStyled } from "../styles/common/common-styles"

export interface ButtonProps {
    color: "primary" | "secondary",
    handleOnClick?: () => void,
    children: ReactNode,
    width?: string,
    type?: "button" | "submit" | "reset";
}

export const Button = ({ color, handleOnClick, children, type = "button", width }: ButtonProps): ReactElement => {
    const widthValue = (width != undefined && width != "" ) ? width : "initial";
    return (
        <>
            <ButtonStyled type={type} $width={widthValue} $buttontheme={color} onClick={() => handleOnClick !== undefined && handleOnClick()}>{children}</ButtonStyled>
        </>
    )
}