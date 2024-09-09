import React from "react";
import { ReactElement } from "react";
import bookIcon from '@/assets/icons/book-open.svg'
import { Button } from '@/component/common/inputs'
import { HeaderComponent } from "@/AppStyled";

export const Header = ():ReactElement => {
    return(
        <HeaderComponent>
          <div className="left">

            <div className="logo">
              <img src={bookIcon} />
              <span className="title">Caderno31</span>
            </div>
            <a>Home</a>
            <a>Categories</a>
            <a>Posts</a>
          </div>
          <div className="right">
            <Button color='secondary'>log in</Button>
            <Button color='primary'>sign up</Button>
          </div>
        </HeaderComponent>
    )
}