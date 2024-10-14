import React, { useState, ReactNode } from "react";
import { InputFieldContent } from "../styles/common/input-field-styles";
import { InputFIeldProps } from "../interfaces";
import Icon from "../icons/icon";
import { useTheme } from "styled-components";

export const InputFIeld = ({ icon, label, placeHolder, instructions, errors }: InputFIeldProps): ReactNode => {
    const Theme = useTheme().colors;

    // Estado para controlar o foco do input
    const [isFocused, setIsFocused] = useState(false);

    // Função para controlar quando o input ganhar o foco
    const handleFocus = () => {
        setIsFocused(true);
    };

    // Função para controlar quando o input perder o foco
    const handleBlur = () => {
        setIsFocused(false);
    };

    const showDivOnFocus = {
        maxHeight: isFocused ? "400px" : "0px",
    };
    

    return (
        <InputFieldContent>
            <label htmlFor={`${label}`}>{label}</label>
            <div className="input-holder">
                <input
                    name={`${label}`}
                    id={`${label}`}
                    type="text"
                    placeholder={placeHolder}
                    onFocus={handleFocus}  // Chama a função ao focar
                    onBlur={handleBlur}    // Chama a função ao desfocar
                />

                {icon !== null && icon !== undefined && (
                    <Icon
                        icon={icon}
                        // Condiciona a cor do ícone com base no estado de foco
                        color={isFocused ? Theme["text-color-hover"] : Theme["text-color"]}
                        size={16}
                    />
                )}
            </div>
                {instructions !== null && instructions !== undefined && (
                    <div className="instructions" style={showDivOnFocus}>
                        <tr>
                            {instructions?.map((instruction) => {
                                return <li>{instruction}</li>
                            })}
                        </tr>
                    </div>
                )}
        </InputFieldContent>
    );
};
