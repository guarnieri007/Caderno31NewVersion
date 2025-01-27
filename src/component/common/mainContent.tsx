import { ContentContainer } from "../../AppStyled";
import { ReactNode } from "react";

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