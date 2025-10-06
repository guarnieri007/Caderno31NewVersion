import { ReactElement, useState } from "react";
import { useEffect } from "react";
import { setRemoveScroll } from "../../context/RemoveScrollSingleton";
import Overlay from "../common/overlay";
import { MakeLogin } from "./make-login";
import { ResetPassword } from "./reset-password";




interface LoginOverlayProps {
    onClose: () => void;
}

export const Login_overlay = ({ onClose }: LoginOverlayProps): ReactElement => {

    const [showLogin, setShowLogin] = useState<boolean>(true);

    useEffect(() => {
        setRemoveScroll(true);
    }, []);


    function closeWithContext(): void {
        setRemoveScroll(false);
        onClose();
    }

    function changeToForgotPassword(): void {
        setShowLogin(false);
    }
    
    function changeToLogin(): void {
        setShowLogin(true);
    }

    return (
        <Overlay>
            {showLogin ? (
                <MakeLogin onClose={closeWithContext} changeToForgotPassword={changeToForgotPassword} />
            )
            :
            (
                <ResetPassword onClose={closeWithContext} changeToLogin={changeToLogin} />
            )
        }
        </Overlay>
    );
}
