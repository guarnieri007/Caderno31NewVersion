import { ReactElement, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { Button } from "../common/button";
import { useEffect } from "react";
import { useI18n } from "../../i18n";
import { setRemoveScroll } from "../../context/RemoveScrollSingleton";
import { MakeLoginStyle } from "../styles/common/make-login-style";


interface LoginOverlayProps {
    onClose: () => void;
    changeToForgotPassword?: () => void;
}

export const MakeLogin = ({ onClose, changeToForgotPassword }: LoginOverlayProps): ReactElement => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { t } = useI18n();

    const signUpSchema = z.object({
        email: z.string().email(t("component.forms.generalValidations.invalidEmail", undefined, "Invalid email format")).min(6, t("component.forms.generalValidations.minCharacters", { "item": "Email", "min": 6 }, "Email must be at least 6 characters")).max(200, t("component.forms.generalValidations.maxCharacters", { "item": "Email", "max": 200 }, "Email must be at most 200 characters")),
        password: z.string().min(6, t("component.forms.generalValidations.minCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "min": 6 }, "Password must be at least 6 characters"))
            .max(50, t("component.forms.generalValidations.maxCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "max": 50 }, "Password must be at most 50 characters")),
    });


    type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

    const maxLengths = extractMinMaxLengths(signUpSchema);
    const { handleLogin, loadingLogin, successLogin, setSuccessLogin, errorLogin } = useLogin()

    const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});

    useEffect(() => {
        if (successLogin) {
            onClose(); // Exemplo: fechar modal de login
            setSuccessLogin(false); // resetar flag para futuros logins
        }
    }, [successLogin]);

    useEffect(() => {
        setRemoveScroll(true);
    }, []);

    async function handleLoginComponent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };
        const validation = validateFormData(signUpSchema, data);

        if (validation.success) {
            setErrors({}); // Nenhum erro
            await handleLogin(validation.data.email, validation.data.password);
        }
        else {
            setErrors(validation.errors); // 🎯 Erros já formatados para exibir no frontend
        }

    }

    return (

            <MakeLoginStyle>
                <div className="form-group">
                    <button className="closeButton" onClick={() => onClose()}>X {t('component.common.login-overlay.close', undefined, 'Close')}</button>
                    <h2 style={{ textAlign: "center" }}>{t('component.common.login-overlay.title', undefined, 'Login')}</h2>
                    <form onSubmit={handleLoginComponent} className="formStyle">
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
                        <InputFIeld
                            key={"Password"}
                            icon={UIIcons.Key}
                            label={t('component.common.login-overlay.passwordLabel', undefined, 'Password')}
                            name="password"
                            placeholder={t('component.common.login-overlay.passwordPlaceholder', undefined, 'Enter your password')}
                            maxLength={maxLengths.password?.max ?? 0}
                            type="password"
                            errors={errors.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" width="100%" color="secondary" loading={loadingLogin} clicable={!loadingLogin}>{t('component.common.login-overlay.submit', undefined, 'Log In')}</Button>
                    </form>
                    {errorLogin && <p className="error">{errorLogin}</p>}
                </div>
                <div className="form-group centerFlexItems">
                    <p className="paragraph">{t('component.common.login-overlay.forgotPassword', undefined, 'If you forgot your password, click on the button below to reset it.')}</p>
                    <Button type="button" color="secondary" handleOnClick={changeToForgotPassword}>{t('component.common.login-overlay.resetPassword', undefined, 'Reset Password')}</Button>
                </div>
            </MakeLoginStyle>
    );
}
