import React, { ReactElement } from "react";
import { SignUpPage } from "../styles/pages/signup";
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { Button } from "../common/button";
import signup_bg from "@/assets/images/signup_bg.png";

export const SignUp = (): ReactElement => {

    function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Adicione aqui as validações antes de enviar o formulário
        console.log("Formulário submetido!");
    }


    return (
        <SignUpPage $bg_image={signup_bg}>
            <div className="photo">
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
                        instructions={["Must be a unique nickname", "should have up to 60 characteres"]}
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
                    <div className="termsContainer">
                        <input type="checkbox" name="termsAndConditions" id="termsAndConditions" />
                        <label htmlFor="termsAndConditions" className="terms">I agree with terms and Privacy Policy</label>
                    </div>

                    <Button width={"100%"} color="primary" type="submit"> Get started</Button>
                </form>
            </div>

        </SignUpPage>
    );
}