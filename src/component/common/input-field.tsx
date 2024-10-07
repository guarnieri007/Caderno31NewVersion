import React, { ReactNode } from "react"
import { InputFieldContent } from "../styles/common/input-field-styles"
import { InputFIeldProps } from "../interfaces"
import Icon from "../icons/icon"
import { useTheme } from "styled-components"

export const InputFIeld = ({ icon, label, placeHolder }: InputFIeldProps): ReactNode => {
    const Theme = useTheme().colors;
    return (
        <InputFieldContent>
            <label htmlFor={`${label}`} >{label}</label>
            <div className="input-holder">
                <input name={`${label}`} type="text" placeholder={placeHolder} />

                {icon !== null && (
                    <Icon icon={icon} color={Theme["text-color-hover"]} size={16} />
                )}
            </div>

        </InputFieldContent>
    )
}