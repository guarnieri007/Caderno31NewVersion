import { ReactNode } from "react"
import { ReactElement } from "react"
import { ButtonStyled } from "../styles/common/common-styles"

export interface ButtonProps {
    color: "primary" | "secondary",
    handleOnClick?: () => void,
    children: ReactNode,
    width?: string,
    type?: "button" | "submit" | "reset";
    clicable?: boolean;
}

export const Button = ({ color, handleOnClick, children, type = "button", width, clicable = true }: ButtonProps): ReactElement => {
    const widthValue = (width != undefined && width != "") ? width : "initial";
    return (
        <>
            <ButtonStyled
                type={type}
                $width={widthValue}
                $buttontheme={color}
                onClick={() => handleOnClick !== undefined && handleOnClick()}
                disabled={!clicable}
                $clicable={clicable}
                >
                {children}
            </ButtonStyled>
        </>
    )
}