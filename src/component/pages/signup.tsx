import React, { ReactElement, useState } from "react";
import { SignUpPage } from "../styles/pages/signup";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { Button } from "../common/button";
import signup_bg from "@/assets/images/signup_bg.png";
import { z } from "zod";

// Define o esquema de validação com Zod
const signUpSchema = z.object({
  nickname: z.string().min(1, "Nickname is required").max(60, "Nickname too long"),
  email: z.string().email("Invalid email format").max(100, "Email too long"),
  username: z.string().min(1, "Username is required").max(50, "Username too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password too long"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters").max(50, "Password too long"),
  termsAndConditions: z.boolean().refine(val => val === true, "You must agree with the terms and privacy policy"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

export const SignUp = (): ReactElement => {
  const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});

  function sendForm(event: React.FormEvent<HTMLFormElement>) {
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

    // Validação com Zod
    const validationResult = signUpSchema.safeParse(data);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      const newErrors: { [key in keyof SignUpFormValues]?: string[] } = {};

      (Object.keys(fieldErrors) as Array<keyof SignUpFormValues>).forEach(key => {
        const fieldError = fieldErrors[key]?._errors;
        if (fieldError && Array.isArray(fieldError)) {
          newErrors[key] = fieldError; // Armazena todos os erros para o campo
        }
      });

      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Formulário submetido com sucesso!", validationResult.data);
      // Aqui você pode chamar a API ou realizar outras ações com os dados válidos
    }
  }

  return (
    <SignUpPage $bg_image={signup_bg}>
      <div className="photo"></div>
      <div className="form">
        <h1>Sign up</h1>
        <h2>Join our community today!</h2>
        <form action="" className="signupForm" onSubmit={sendForm}>
          <InputFIeld
            icon={UIIcons.IdCard}
            label="Nickname"
            name="nickname"
            placeHolder="Choose a unique nickname"
            instructions={["Must be a unique nickname", "should have up to 60 characters"]}
            maxLength={50}
            errors={errors.nickname}
          />
          <InputFIeld
            icon={UIIcons.Letter}
            label="Email"
            name="email"
            placeHolder="Enter your email"
            maxLength={100}
            errors={errors.email}
          />
          <InputFIeld
            icon={UIIcons.User}
            label="Username"
            name="username"
            placeHolder="Create your username"
            maxLength={50}
            errors={errors.username}
          />
          <InputFIeld
            icon={UIIcons.Key}
            label="Create your password"
            name="password"
            placeHolder="Enter a new password"
            maxLength={50}
            type="password"
            errors={errors.password}
          />
          <InputFIeld
            icon={UIIcons.Lock}
            label="Confirm password"
            name="confirmPassword"
            placeHolder="Type again the same password"
            maxLength={50}
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

          <Button width={"100%"} color="primary" type="submit">
            Get started
          </Button>
        </form>
      </div>
    </SignUpPage>
  );
};
