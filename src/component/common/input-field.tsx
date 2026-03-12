import { useState, ReactNode } from "react";
import { InputFieldContent } from "../styles/common/input-field-styles";
import { InputFIeldProps } from "../../interfaces";
import Icon from "../icons/icon";
import { Label } from "./label";

export const InputFIeld = (
    {
        icon,
        label,
        placeholder,
        instructions,
        maxLength,
        name,
        type,
        errors,
        value,
        onChange,
        inputFields,
        labelValue,
        onFocus,
        onBlur,
        disabled,
        restrictMaxLengthByText = true,

    }: InputFIeldProps): ReactNode => {
    const hasErrors: boolean = errors !== undefined && errors.length > 0;
    const [inputValue, setInputValue] = useState<string>((value ?? "") as string);

    // Estado para controlar o foco do input
    const [isFocused, setIsFocused] = useState(false);

    // Função para controlar quando o input ganhar o foco
    const handleFocus = () => {
        if (onFocus) {
            onFocus();
        }
        setIsFocused(true);
    };

    // Função para controlar quando o input perder o foco
    const handleBlur = () => {
        if (onBlur) {
            onBlur();
        }
        setIsFocused(false);
    };

    const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (onChange) {
            onChange(event);
        } else {
            setInputValue(event.target.value);
        }
    }

    let labelLength = labelValue && typeof labelValue === "number"
    ? labelValue : Number(labelValue);

    const valueLabel = typeof value === "string" ? value.length : 0;

    return (
        <InputFieldContent has_errors={hasErrors} is_focused={isFocused}>
            <div className="holder">
                <Label
                    label={label}
                    length={(!restrictMaxLengthByText
                        ? labelLength
                        : valueLabel)}
                    maxLength={maxLength}
                    is_focused={isFocused}
                    forInput={name}
                    counting={type === "number" ? false : true}
                />
                <div className="input-holder">
                    <input
                        name={`${name}`}
                        id={`${name}`}
                        type={type !== undefined ? type : "text"}
                        min={type === "number" ? "1" : undefined}
                        max={type === "number" ? "999999" : undefined}
                        step={type === "number" ? "1" : undefined}

                        placeholder={placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setValue(e)}
                        value={value !== undefined ? value : inputValue}
                        maxLength={restrictMaxLengthByText ? maxLength : undefined}
                        {...inputFields}
                        disabled={disabled}
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
                        <ul>
                            {instructions?.map((instruction) => {
                                return <li key={instruction}>{instruction}</li>
                            })}
                        </ul>
                    </div>
                )}
                {hasErrors && (
                    <div>
                        <ul className="instructions errors">
                            {errors?.map((error) => {
                                return <li key={error}><span>{error}</span></li>
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </InputFieldContent>
    );
};
