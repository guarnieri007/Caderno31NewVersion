import { ReactElement, useState } from "react";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { Button } from "../common/button";
import { useEffect } from "react";
import { useI18n } from "../../i18n";
import { MakeLoginStyle } from "../styles/common/make-login-style";
import { useForgotPassword } from "../../hooks/useForgotPassword";


interface ForgotPasswordProps {
    onClose: () => void;
    changeToLogin?: () => void;
}

export const ResetPassword = ({ onClose, changeToLogin }: ForgotPasswordProps): ReactElement => {
    const [username, setUsername] = useState<string>("");
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const { t } = useI18n();

    const signUpSchema = z.object({
        email: z.string().email(t("component.forms.generalValidations.invalidEmail", undefined, "Invalid email format")).min(6, t("component.forms.generalValidations.minCharacters", { "item": "Email", "min": 6 }, "Email must be at least 6 characters")).max(200, t("component.forms.generalValidations.maxCharacters", { "item": "Email", "max": 200 }, "Email must be at most 200 characters")),
    });


    type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

    const maxLengths = extractMinMaxLengths(signUpSchema);
    const { handleForgotPassword, loadingForgotPassword, errorForgotPassword, successForgotPassword, setSuccessForgotPassword} = useForgotPassword();

    const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});

    useEffect(() => {
        if (successForgotPassword) {
            setSuccessForgotPassword(false); // resetar flag para futuros logins
            setShowMessage(true);
        }
    }, [successForgotPassword]);

    async function handleForgotPasswordComponent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email") as string,
        };
        const validation = validateFormData(signUpSchema, data);

        if (validation.success) {
            setErrors({}); // Nenhum erro
            await handleForgotPassword(validation.data.email);
        }
        else {
            setErrors(validation.errors); // 🎯 Erros já formatados para exibir no frontend
        }

    }

    return (

            <MakeLoginStyle>
                <div className="form-group">
                    <button className="closeButton" onClick={() => {setShowMessage(false); onClose()}}>X {t('component.common.login-overlay.close', undefined, 'Close')}</button>
                    <h2 style={{ textAlign: "center" }}>{t('component.common.login-overlay.forgetPasswordTitle', undefined, 'Login')}</h2>
                    <form onSubmit={handleForgotPasswordComponent} className="formStyle">
                        <InputFIeld
                            key={"Email"}
                            icon={UIIcons.Letter}
                            label={t('component.common.login-overlay.emailLabel', undefined, 'Email')}
                            name="email"
                            placeholder={t('component.common.login-overlay.emailPlaceholder', undefined, 'Enter your email')}
                            maxLength={maxLengths.email?.max ?? 0}
                            errors={errors.email}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button type="submit" width="100%" color="secondary" loading={loadingForgotPassword} clicable={!loadingForgotPassword}>{t('component.common.login-overlay.submit', undefined, 'Log In')}</Button>
                    </form>
                    {errorForgotPassword && <p className="error">{errorForgotPassword}</p>}
                    {showMessage && <p className="success">{t('component.complex.reset-password.successMessage', undefined, 'If the email is registered, you will receive a password reset link shortly.')}</p>}
                </div>
                <div className="form-group centerFlexItems">
                    <p className="paragraph">{t('component.common.login-overlay.makeLogin', undefined, 'If you know your password, click on the button below to log in.')}</p>
                    <Button type="button" color="secondary" handleOnClick={changeToLogin} >{t('component.common.login-overlay.makeLoginButton', undefined, 'Log In')}</Button>
                </div>
            </MakeLoginStyle>
    );
}
