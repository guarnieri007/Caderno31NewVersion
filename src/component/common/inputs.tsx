import React, { ReactNode } from "react"
import { ReactElement } from "react"
import style from "./input.module.scss"

export interface ButtonProps {
    color: "primary" | "secondary",
    handleOnClick?: () => void,
    children: ReactNode,
}

export const Button = ({color, handleOnClick, children}:ButtonProps):ReactElement => {
    return (
        <button onClick={() => handleOnClick} className={`${style.button} ${style[color]}`}>{children}</button>
    )
}