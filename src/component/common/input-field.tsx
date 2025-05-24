import { useState, ReactNode } from "react";
import { InputFieldContent } from "../styles/common/input-field-styles";
import { InputFIeldProps } from "../../interfaces";
import Icon from "../icons/icon";
import { Label } from "./label";

export const InputFIeld = ({ icon, label, placeholder, instructions, maxLength, name, type, errors, value = "" }: InputFIeldProps): ReactNode => {
    const hasErrors: boolean = errors !== undefined && errors.length > 0;
    const [inputValue, setInputValue] = useState<HTMLInputElement["value"]>(value as string);

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

    const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }


    return (
        <InputFieldContent has_errors={hasErrors} is_focused={isFocused}>
            <div className="holder">
                <Label
                    label={label}
                    length={inputValue.length}
                    maxLength={maxLength}
                    is_focused={isFocused}
                />
                <div className="input-holder">
                    <input
                        name={`${name}`}
                        id={`${label}`}
                        type={type !== undefined ? type : "text"}
                        placeholder={placeholder}
                        onFocus={handleFocus}  // Chama a função ao focar
                        onBlur={handleBlur}    // Chama a função ao desfocar
                        onChange={(e) => setValue(e)}
                        value={inputValue}
                        maxLength={maxLength}
                    />

                    {icon !== null && icon !== undefined && (
                        <Icon
                            icon={icon}
                            // Condiciona a cor do ícone com base no estado de foco
                            size={16}
                        />
                    )}
                </div>
                {instructions !== null && instructions !== undefined && (
                    <div className="instructions expand">
                        <tr>
                            {instructions?.map((instruction) => {
                                return <li>{instruction}</li>
                            })}
                        </tr>
                    </div>
                )}
                {hasErrors && (
                    <div>
                        <tr className="instructions errors">
                            {errors?.map((error) => {
                                return <li><span>{error}</span></li>
                            })}
                        </tr>
                    </div>
                )}
            </div>
        </InputFieldContent>
    );
};
