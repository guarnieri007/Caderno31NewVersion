import React, { ReactNode } from "react"
import { ReactElement } from "react"
import { ButtonStyled } from "@/component/common/common-styles"

export interface ButtonProps {
    color: "primary" | "secondary",
    handleOnClick?: () => void,
    children: ReactNode,
}

export const Button = ({ color, handleOnClick, children }: ButtonProps): ReactElement => {
    return (
        <>
            <ButtonStyled ButtonTheme={color} onClick={() => handleOnClick}>{children}</ButtonStyled>
        </>
    )
}