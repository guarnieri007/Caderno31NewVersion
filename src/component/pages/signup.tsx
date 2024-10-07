import React, { ReactElement } from "react";
import { SignUpPage } from "../styles/pages/signup";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { Button } from "../common/inputs";

export const SignUp = (): ReactElement => {

    function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Adicione aqui as validações antes de enviar o formulário
        console.log("Formulário submetido!");
    }
    

    return (
        <SignUpPage>
            <div className="photo">
                foto
            </div>
            <div className="form">
                <h1>
                    Sign up
                </h1>
                <h2>
                    Join our community today!
                </h2>
                <form action="" className="signupForm" onSubmit={sendForm} >
                    <InputFIeld
                        icon={UIIcons.IdCard}
                        label="Nickname"
                        placeHolder="Choose a unique nickname"
                    />
                    <InputFIeld
                        icon={UIIcons.Letter}
                        label="Email"
                        placeHolder="Enter your email"
                    />
                    <InputFIeld
                        icon={UIIcons.User}
                        label="Username"
                        placeHolder="Create your username"
                    />
                    <InputFIeld
                        icon={UIIcons.Key}
                        label="Create your password"
                        placeHolder="Enter a new password"
                    />
                    <InputFIeld
                        icon={UIIcons.Lock}
                        label="Confirm password"
                        placeHolder="Type again the same password"
                    />
                    <input type="checkbox" name="termsAndConditions" />
                    <span>I agree with terms and Privacy Policy</span>
                    <Button color="primary"> Get started</Button>
                </form>
            </div>

        </SignUpPage>
    );
}