import { ReactElement, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { InputFIeld } from "./input-field";
import { UIIcons } from "../icons";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { Button } from "./button";
import { useEffect } from "react";
import { DefaultTheme } from "styled-components/dist/types";
import { useTheme } from "styled-components";


interface LoginOverlayProps {
    onClose: () => void;
}

export const Login_overlay = ({ onClose }: LoginOverlayProps): ReactElement => {

    
    const theme: DefaultTheme = useTheme();
    
    const loginOverlay: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
    };
    
    const loginBox:React.CSSProperties = {
        background: theme.colors.background_secondary,
        padding: "2rem",
        borderRadius: "10px",
        width: "min(333px calc(100% - 0.5rem))",
        position: "relative",
        overflowY: "auto",

      }

      const closeButton:React.CSSProperties = {
        position: "absolute",
        top: "52px",
        right: "32px",
        background: "transparent",
        border: "1px solid #fff",
        borderRadius: "5px",
        padding: "5px 10px",
        fontSize: "18px",
        cursor: "pointer",
        color: theme.colors.text,
        lineHeight: "18px",
      }

    const signUpSchema = z.object({
        email: z.string().email("Invalid email format").min(6, "Email is required with a minimun 6 characters").max(150, "Email too long"),
        password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password too long"),
    });


    type SignUpFormValues = z.infer<typeof signUpSchema>; // Inferir o tipo do esquema

    const maxLengths = extractMinMaxLengths(signUpSchema);
    const { handleLogin, loadingLogin, successLogin, setSuccessLogin } = useLogin()

    const [errors, setErrors] = useState<{ [key in keyof SignUpFormValues]?: string[] }>({});

    useEffect(() => {
        if (successLogin) {
            onClose(); // Exemplo: fechar modal de login
            setSuccessLogin(false); // resetar flag para futuros logins
        }
    }, [successLogin]);

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
            handleLogin(validation.data.email, validation.data.password);
        }
        else {
            setErrors(validation.errors); // 🎯 Erros já formatados para exibir no frontend
        }

    }

    return (
        <div style={loginOverlay}>
            <div style={loginBox}>
                <button style={closeButton} onClick={onClose}>X Fechar</button>
                <h2>Login</h2>
                <form onSubmit={handleLoginComponent}>
                    <InputFIeld
                        key={"Email"}
                        icon={UIIcons.Letter}
                        label="Email"
                        name="email"
                        placeHolder="Enter your email"
                        maxLength={maxLengths.email?.max ?? 0}
                        errors={errors.email}
                        value={"guarnieri007@hotmail.com"}
                    />
                    <InputFIeld
                        key={"Password"}
                        icon={UIIcons.Key}
                        label="Password"
                        name="password"
                        placeHolder="Enter your password"
                        maxLength={maxLengths.password?.max ?? 0}
                        type="password"
                        errors={errors.password}
                        value={"senhasegura123"}
                    />
                    <Button type="submit" width="100%" color="primary" loading={loadingLogin} clicable={!loadingLogin}>Log In</Button>
                </form>
            </div>
        </div>
    );
}
