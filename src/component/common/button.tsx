import { ReactNode } from "react"
import { ReactElement } from "react"
import { ButtonStyled, Spinner } from "../styles/common/common-styles"

export interface ButtonProps {
    color: "primary" | "secondary",
    handleOnClick?: () => void,
    children: ReactNode,
    width?: string,
    type?: "button" | "submit" | "reset";
    clicable?: boolean;
    loading?: boolean;
}

export const Button = ({ color, handleOnClick, children, type = "button", width, loading = false, clicable = true }: ButtonProps): ReactElement => {
    const widthValue = (width != undefined && width != "") ? width : "initial";
    return (
        <>
            <ButtonStyled
                type={type}
                width={widthValue}
                buttontheme={color}
                onClick={() => handleOnClick !== undefined && handleOnClick()}
                disabled={!clicable}
                clicable={clicable}
            >
                <span style={{ visibility: loading ? "hidden" : "visible", width: "100%" }}>
                    {children}
                </span>
                {loading && (
                    <span style={{ position: "absolute" }}>
                        <Spinner />
                    </span>
                )}
            </ButtonStyled>

        </>
    )
}