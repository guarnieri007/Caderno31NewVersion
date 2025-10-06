import { ReactElement, useState } from "react";
import { SignUpPage } from "../component/styles/pages/signup";
import { InputFIeld } from "../component/common/input-field";
import { UIIcons } from "../component/icons";
import { Button } from "../component/common/button";
import signup_bg from "../assets/images/signup_bg.png";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../helper/zod-helper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useI18n } from "../i18n";
import { AuthAPI } from "../api/auth";


export const ResetPassword = (): ReactElement => {
  const { t } = useI18n();
  // Define o esquema de validação com Zod
  
  const signUpSchema = z.object({
    password: z.string().min(6, t("component.forms.generalValidations.minCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "min": 6 }, "Password must be at least 6 characters"))
      .max(50, t("component.forms.generalValidations.maxCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "max": 50 }, "Password must be at most 50 characters")),
    confirmPassword: z.string().min(6, t("component.forms.generalValidations.minCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "min": 6 }, "Password must be at least 6 characters"))
      .max(50, t("component.forms.generalValidations.maxCharacters", { "item": t('component.common.login-overlay.passwordLabel', undefined, 'Password'), "max": 50 }, "Password must be at most 50 characters")),
  }).refine(data => data.password === data.confirmPassword, {
    message: t("component.forms.generalValidations.passwordsDoNotMatch", undefined, "Passwords do not match"),
    path: ["confirmPassword"],
  });
  
  
  // Extract max lengths using schema.innerType.shape.fieldName._def.checks
  const maxLengths = extractMinMaxLengths(signUpSchema);
  
  type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // null if missing

  const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const { resetPasswordEmailToken } = AuthAPI();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof typeof formValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  async function sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    // Coletando os valores dos inputs
    const data = {
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
    };

    const validation = validateFormData(signUpSchema, data);

    if (validation.success) {
      if (!token) {
        setErrors({ confirmPassword: [t("component.forms.generalValidations.tokenInvalidOrExpired", undefined, "Token invalid or expired, please request a new reset link")] });
        setLoading(false);
        return;
      }

      setErrors({}); // Nenhum erro

      try {
        await resetPasswordEmailToken({ token, newPassword: validation.data.password });
        navigate("/");

      } catch (error) {
        console.log(`Erro ao redefinir senha: ${error}`);
      } finally {
        setLoading(false);
      }

    }

    else {
      setErrors(validation.errors); // 🎯 Erros já formatados para exibir no frontend
      setLoading(false);
    }
  }


  return (
    <SignUpPage bg_image={signup_bg}>
      <div className="grid_div">

        <div className="photo"></div>
        <div className="form">
          <h1>{t('pages.resetPassword.title', undefined, 'Set a new password')}</h1>
          <h2>{t('pages.resetPassword.subtitle', undefined, 'Join our community today!')}</h2>
          <form className="signupForm" onSubmit={sendForm}>
            <InputFIeld
              key={"Create your password"}
              icon={UIIcons.Key}
              label={t('pages.resetPassword.form.passwordLabel', undefined, 'Create your password')}
              name="password"
              placeholder={t('pages.resetPassword.form.passwordPlaceholder', undefined, 'Enter a new password')}
              maxLength={maxLengths.password?.max ?? 0}
              type="password"
              errors={errors.password}
              value={formValues.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <InputFIeld
              key={"Confirm password"}
              icon={UIIcons.Lock}
              label={t('pages.resetPassword.form.confirmPasswordLabel', undefined, 'Confirm password')}
              name="confirmPassword"
              placeholder={t('pages.resetPassword.form.confirmPasswordPlaceholder', undefined, 'Type again the same password')}
              maxLength={maxLengths.confirmPassword?.max ?? 0}
              type="password"
              errors={errors.confirmPassword}
              value={formValues.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            />

            <Button width={"100%"} color="primary" type="submit" clicable={!loading} loading={loading}>
              {t('pages.resetPassword.form.submit', undefined, 'Get started')}
            </Button>
          </form>
        </div>
      </div>

    </SignUpPage>
  );
};
