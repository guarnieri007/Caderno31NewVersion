import { ReactElement, useState } from "react";
import { SignUpPage } from "../styles/pages/signup";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { Button } from "../common/button";
import signup_bg from "../../assets/images/signup_bg.png";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useCreateCredential } from "../../hooks/useCreateCredential";

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

export const SignUp = (): ReactElement => {
  const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});
  const {
    successCreateCredential,
    loadingCreateCredential,
    handleCreateCredential,
    errorCreateCredential,
  } = useCreateCredential();
  const { handleLogin, successLogin } = useLogin();
  const navigate = useNavigate();

  async function sendForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Coletando os valores dos inputs
    const formData = new FormData(event.currentTarget);
    const data = {
      nickname: formData.get("nickname") as string,
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
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
          <h1>Sign up</h1>
          <h2>Join our community today!</h2>
          <form className="signupForm" onSubmit={sendForm}>
            <InputFIeld
              key={"Nickname"}
              icon={UIIcons.IdCard}
              label="Nickname"
              name="nickname"
              placeholder="Choose a unique nickname"
              instructions={["Must be a unique nickname", "should have up to 60 characters"]}
              maxLength={maxLengths.nickname?.max ?? 0}
              errors={errors.nickname}
            />
            <InputFIeld
              key={"Email"}
              icon={UIIcons.Letter}
              label="Email"
              name="email"
              placeholder="Enter your email"
              maxLength={maxLengths.email?.max ?? 0}
              errors={errors.email}
            />
            <InputFIeld
              key={"Username"}
              icon={UIIcons.User}
              label="Username"
              name="username"
              placeholder="Create your username"
              maxLength={maxLengths.username?.max ?? 0}
              errors={errors.username}
            />
            <InputFIeld
              key={"Create your password"}
              icon={UIIcons.Key}
              label="Create your password"
              name="password"
              placeholder="Enter a new password"
              maxLength={maxLengths.password?.max ?? 0}
              type="password"
              errors={errors.password}
            />
            <InputFIeld
              key={"Confirm password"}
              icon={UIIcons.Lock}
              label="Confirm password"
              name="confirmPassword"
              placeholder="Type again the same password"
              maxLength={maxLengths.confirmPassword?.max ?? 0}
              type="password"
              errors={errors.confirmPassword}
            />
            <div className="termsContainer">
              <div>
                <input type="checkbox" name="termsAndConditions" id="termsAndConditions" />
                <label htmlFor="termsAndConditions" className="terms">
                  I agree with terms and Privacy Policy
                </label>
              </div>
              {errors.termsAndConditions && <p className="error">{errors.termsAndConditions}</p>}
            </div>

            <Button width={"100%"} color="primary" type="submit" clicable={!loadingCreateCredential} loading={loadingCreateCredential}>
              Get started
            </Button>
          </form>
        </div>
      </div>

    </SignUpPage>
  );
};
