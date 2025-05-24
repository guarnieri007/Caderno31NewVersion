import { LabelProps } from "../../interfaces"
import { LabelStyle } from "../styles/common/label"

export const Label = ({ label, length, maxLength, is_focused = false, forInput }:LabelProps) => {

    return (
        <LabelStyle is_focused={is_focused}>
            <label htmlFor={`${forInput}`}>{label}</label>
            <div className="characters">
                <p>
                    {length} / {maxLength}
                </p>
            </div>
        </LabelStyle>
    )
}