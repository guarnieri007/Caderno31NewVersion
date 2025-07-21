import { ReactElement, useState } from "react";
import { Button } from '../../component/common/button'
import { HeaderComponent } from "../../AppStyled";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useAuth } from "../../context/AuthContext";
import { Login_overlay } from "../common/login-overlay";
import { useLogout } from "../../hooks/useLogout";
import { LanguageSwitcher } from "./languageSwitcher";

export const Header = (): ReactElement => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleLogout, loadingLogout } = useLogout();
  const [showLogin, setShowLogin] = useState(false); // 🔥 controla se o overlay aparece

  function GoToSignup() {
    navigate("/signupUser");
  }

  function GoToPostContent() {
    navigate("/publishContent");
  }

  function OpenLoginForm() {
    setShowLogin(true); // 🔥 Abre o login
  }

  function CloseLoginForm() {
    setShowLogin(false); // 🔥 Fecha o login
  }

  return (
    <>

      <HeaderComponent>
        <div className="left">

          <NavLink to="/" className="logo">
            <Icon icon={UIIcons.Book} size={24} color="#000" />
            <span className="title">Caderno31</span>
          </NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <LanguageSwitcher />
        </div>
        <div className="right">
          {user ? (
            <>
              {user && (
                <>
                  <a >{user.username}</a>
                  <Button color="secondary" handleOnClick={handleLogout} loading={loadingLogout} clicable={!loadingLogout}>Logout</Button>
                  <Button color="primary" handleOnClick={GoToPostContent} >Post a new content</Button>
                </>
              )}
            </>
          )
            :
            (
              <>
                <Button color='secondary' handleOnClick={OpenLoginForm} >log in</Button>
                <Button color='primary' handleOnClick={GoToSignup}>sign up</Button>
              </>
            )}
          
        </div>
      </HeaderComponent>
      {/* Se showLogin for true, renderiza o overlay */}
      {showLogin && <Login_overlay onClose={CloseLoginForm} />}
    </>
  )
}