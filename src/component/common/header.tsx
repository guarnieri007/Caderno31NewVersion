import { ReactElement, useState } from "react";
import { Button } from '../../component/common/button'
import { HeaderComponent } from "../../AppStyled";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { LanguageSwitcher } from "./languageSwitcher";
import { Spinner } from "../styles/common/common-styles";
import { useI18n } from "../../i18n";
import { Login_overlay } from "../complex/login-overlay";
import { useAppTheme } from "../../context/ThemeContext";
import { themes } from "../../themes/registry";

export const Header = (): ReactElement => {
  const navigate = useNavigate();
  const { user, firstFetching } = useAuth();
  const { handleLogout, loadingLogout } = useLogout();
  const [showLogin, setShowLogin] = useState(false); // 🔥 controla se o overlay aparece
  const { t } = useI18n();
  const { setVariant, variant } = useAppTheme();

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
            <Icon icon={UIIcons.Book} size={24} />
            <span className="title">Caderno31</span>
          </NavLink>
          <LanguageSwitcher />
          <NavLink to="/search">{t('component.common.header.categories', undefined, 'Categories')}</NavLink>
          <NavLink to="/posts">{t('component.common.header.posts', undefined, 'Posts')}</NavLink>
          {
          Object.keys(themes).map((name) => (
            <span
              key={name}
              onClick={() => setVariant(name)}
              style={{ opacity: variant === name ? 1 : 0.7, cursor: "pointer" }}
            >
              {name}
            </span>
          ))
          }

        </div>
        <div className="right">
          {firstFetching ? (
            <div><Spinner /></div>
          ) :
            (user ? (
              <>
                {user && (
                  <>
                    <a >{user.username}</a>
                    <Button color="secondary" handleOnClick={handleLogout} loading={loadingLogout} clicable={!loadingLogout}>{t('component.common.header.logout', undefined, 'Logout')}</Button>
                    <Button color="primary" handleOnClick={GoToPostContent} >{t('component.common.header.postNewContent', undefined, 'Post a new content')}</Button>
                  </>
                )}
              </>
            )
              :
              (
                <>
                  <Button color='secondary' handleOnClick={OpenLoginForm} >{t('component.common.header.login', undefined, 'log in')}</Button>
                  <Button color='primary' handleOnClick={GoToSignup}>{t('component.common.header.signup', undefined, 'sign up')}</Button>
                </>
              ))}

        </div>
      </HeaderComponent>
      {/* Se showLogin for true, renderiza o overlay */}
      {showLogin && <Login_overlay onClose={CloseLoginForm} />}
    </>
  )
}
