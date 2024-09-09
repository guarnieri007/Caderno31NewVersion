import React, { ReactElement } from "react";
import { ItemsColectionsProps } from "@/component/interfaces"
import { ItemsColectionsDiv } from "@/component/common/common-styles";
import { Button } from "./inputs";

export const ItemsColections = ({ title, children }: ItemsColectionsProps): ReactElement => {
    return (
        <ItemsColectionsDiv>
            <h2>{title}</h2>
            <div>
                {children}
                <Button color="secondary">See more</Button>
            </div>
        </ItemsColectionsDiv>
    )
}