import React from "react";
import { FooterContainer } from "@/AppStyled";

export const Footer = () => {
    return(
        <FooterContainer>
            <div className="footerContainer">
                <div className="footerLeft">
                    <h1>
                       Your secret is safe with us ;) 
                    </h1>
                    <p>
                        The place you can be yourself
                    </p>
                    <div>
                        <span>Caderno31 © 2021</span>
                    </div>
                </div>
                <div className="footerRight">
                    <a>Suport</a>
                    <a>Help Center</a>
                    <a>Assistance Team</a>
                    <a>Instruction</a>
                    <a>Reach out for</a>
                </div>
            </div>
        </FooterContainer>
    )
}