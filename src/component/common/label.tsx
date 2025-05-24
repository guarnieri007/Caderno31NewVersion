import { LabelProps } from "../../interfaces"
import { LabelStyle } from "../styles/common/label"

export const Label = ({ label, length, maxLength, is_focused = false }:LabelProps) => {

    return (
        <LabelStyle is_focused={is_focused}>
            <label htmlFor={`${label}`}>{label}</label>
            <div className="characters">
                <p>
                    {length} / {maxLength}
                </p>
            </div>
        </LabelStyle>
    )
}