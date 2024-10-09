import React, { useState, ReactNode } from "react";
import { InputFieldContent } from "../styles/common/input-field-styles";
import { InputFIeldProps } from "../interfaces";
import Icon from "../icons/icon";
import { useTheme } from "styled-components";

export const InputFIeld = ({ icon, label, placeHolder }: InputFIeldProps): ReactNode => {
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

    return (
        <InputFieldContent>
            <label htmlFor={`${label}`}>{label}</label>
            <div className="input-holder">
                <input 
                    name={`${label}`} 
                    type="text" 
                    placeholder={placeHolder}
                    onFocus={handleFocus}  // Chama a função ao focar
                    onBlur={handleBlur}    // Chama a função ao desfocar
                />

                {icon !== null && (
                    <Icon 
                        icon={icon} 
                        // Condiciona a cor do ícone com base no estado de foco
                        color={isFocused ? Theme["text-color-hover"] : Theme["text-color"]} 
                        size={16} 
                    />
                )}
            </div>
        </InputFieldContent>
    );
};
