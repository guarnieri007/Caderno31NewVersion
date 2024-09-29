import React from "react";
import { ReactElement } from "react";
import { Button } from '@/component/common/inputs'
import { HeaderComponent } from "@/AppStyled";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";

export const Header = ():ReactElement => {
  const navigate = useNavigate();
  
  function GoToSignup() {
    navigate("/signupUser");
  }
    return(
        <HeaderComponent>
          <div className="left">

            <NavLink to="/" className="logo">
              <Icon icon={UIIcons.Book} size={24} color="#000"/>
              <span className="title">Caderno31</span>
            </NavLink>
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