import React from "react";
import { ReactElement } from "react";
import bookIcon from '@/assets/icons/book-open.svg'
import { Button } from '@/component/common/inputs'
import { HeaderComponent } from "@/AppStyled";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = ():ReactElement => {
  const navigate = useNavigate();
  
  function GoToSignup() {
    navigate("/signupUser");
  }
    return(
        <HeaderComponent>
          <div className="left">

            <div className="logo">
              <img src={bookIcon} />
              <NavLink to="/" className="title">Caderno31</NavLink>
            </div>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/posts">Posts</NavLink>
          </div>
          <div className="right">
            <Button color='secondary'>log in</Button>
            <Button color='primary' handleOnClick={GoToSignup}>sign up</Button>
          </div>
        </HeaderComponent>
    )
}