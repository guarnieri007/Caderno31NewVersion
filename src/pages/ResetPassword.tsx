import { ReactElement, useState } from "react";
import { SignUpPage } from "../component/styles/pages/signup";
import { InputFIeld } from "../component/common/input-field";
import { UIIcons } from "../component/icons";
import { Button } from "../component/common/button";
import signup_bg from "../assets/images/signup_bg.png";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../helper/zod-helper";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useCreateCredential } from "../hooks/useCreateCredential";
import { useI18n } from "../i18n";

// Define o esquema de validação com Zod
const signUpSchema = z.object({
  nickname: z.string().min(1, "Nickname is required").max(60, "Nickname too long"),
  email: z.string().email("Invalid email format").min(6, "Email is required with a minimun 6 characters").max(150, "Email too long"),
  username: z.string().min(1, "Username is required").max(50, "Username too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password too long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters").max(50, "Password too long"),
  termsAndConditions: z.boolean().refine(val => val === true, "You must agree with the terms and privacy policy"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(signUpSchema);

type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

export const ResetPassword = (): ReactElement => {
  const { t } = useI18n();
  const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});
  const [formValues, setFormValues] = useState({
    nickname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {
    successCreateCredential,
    loadingCreateCredential,
    handleCreateCredential,
    errorCreateCredential,
  } = useCreateCredential();
  const { handleLogin, successLogin } = useLogin();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof typeof formValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  async function sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Coletando os valores dos inputs
    const formData = new FormData(event.currentTarget);
    const data = {
      nickname: formValues.nickname,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      termsAndConditions: formData.get("termsAndConditions") === "on" ? true : false,
    };

    const validation = validateFormData(signUpSchema, data);

    if (validation.success) {
      setErrors({}); // Nenhum erro
      
      try {

        await handleCreateCredential({ data: validation.data });
        console.log(`Verificando successCreateCredential status: ${successCreateCredential}`);
        console.log(`se existir erros: ${errorCreateCredential}`);
      }
      catch (error) {
        console.log(`Erro ao criar usuário: ${error}`);
        console.log(`Verificando successCreateCredential status: ${successCreateCredential}`);
      }
      if(successCreateCredential) {
        await handleLogin(validation.data.email, validation.data.password);
        console.log(successLogin);
        if (successLogin) navigate("/");
      }


    } else {
      setErrors(validation.errors); // 🎯 Erros já formatados para exibir no frontend
    }
  }


  return (
    <SignUpPage bg_image={signup_bg}>
      <div className="grid_div">

        <div className="photo"></div>
        <div className="form">
          <h1>{t('pages.signup.title', undefined, 'Sign up')}</h1>
          <h2>{t('pages.signup.subtitle', undefined, 'Join our community today!')}</h2>
          <form className="signupForm" onSubmit={sendForm}>
            <InputFIeld
              key={"Email"}
              icon={UIIcons.Letter}
              label={t('pages.signup.form.emailLabel', undefined, 'Email')}
              name="email"
              placeholder={t('pages.signup.form.emailPlaceholder', undefined, 'Enter your email')}
              maxLength={maxLengths.email?.max ?? 0}
              errors={errors.email}
              value={formValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <InputFIeld
              key={"Username"}
              icon={UIIcons.User}
              label={t('pages.signup.form.usernameLabel', undefined, 'Username')}
              name="username"
              placeholder={t('pages.signup.form.usernamePlaceholder', undefined, 'Create your username')}
              maxLength={maxLengths.username?.max ?? 0}
              errors={errors.username}
              value={formValues.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
            <InputFIeld
              key={"Create your password"}
              icon={UIIcons.Key}
              label={t('pages.signup.form.passwordLabel', undefined, 'Create your password')}
              name="password"
              placeholder={t('pages.signup.form.passwordPlaceholder', undefined, 'Enter a new password')}
              maxLength={maxLengths.password?.max ?? 0}
              type="password"
              errors={errors.password}
              value={formValues.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            <InputFIeld
              key={"Confirm password"}
              icon={UIIcons.Lock}
              label={t('pages.signup.form.confirmPasswordLabel', undefined, 'Confirm password')}
              name="confirmPassword"
              placeholder={t('pages.signup.form.confirmPasswordPlaceholder', undefined, 'Type again the same password')}
              maxLength={maxLengths.confirmPassword?.max ?? 0}
              type="password"
              errors={errors.confirmPassword}
              value={formValues.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            />

            <Button width={"100%"} color="primary" type="submit" clicable={!loadingCreateCredential} loading={loadingCreateCredential}>
              {t('pages.signup.form.submit', undefined, 'Get started')}
            </Button>
          </form>
        </div>
      </div>

    </SignUpPage>
  );
};
