import { ContentContainer } from "@/AppStyled";
import React, { ReactNode } from "react";

interface MaindContentProps {
    children: ReactNode
}

export const MainContent = ({children}:MaindContentProps) => {
    return (
        <ContentContainer>
            {children}
        </ContentContainer>
    )
}