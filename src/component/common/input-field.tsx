import { useState, ReactNode } from "react";
import { InputFieldContent } from "../styles/common/input-field-styles";
import { InputFIeldProps } from "../interfaces";
import Icon from "../icons/icon";

export const InputFIeld = ({ icon, label, placeHolder, instructions, maxLength, name, type, errors }: InputFIeldProps): ReactNode => {
    const hasErrors: boolean = errors !== undefined && errors.length > 0;
    const [inputValue, setInputValue] = useState<HTMLInputElement["value"]>("");

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
                <div className="label-holder">
                    <label htmlFor={`${label}`}>{label}</label>
                    <div className="characters">
                        <p>
                            {inputValue.length} / {maxLength}
                        </p>
                    </div>
                </div>
                <div className="input-holder">
                    <input
                        name={`${name}`}
                        id={`${label}`}
                        type={type !== undefined ? type : "text"}
                        placeholder={placeHolder}
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
