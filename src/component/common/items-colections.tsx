import { ReactElement } from "react";
import { ItemsColectionsProps } from "../../interfaces"
import { Button } from "./button";
import { ItemsColectionsDiv } from "../styles/common/common-styles";

export const ItemsColections = ({ title, children }: ItemsColectionsProps): ReactElement => {
    return (
        <ItemsColectionsDiv>
            <h2>{title}</h2>
            <div className="collectionContainer">
                {children}
                <div className="containerButton">
                    <Button color="secondary">See more</Button>
                </div>
            </div>
        </ItemsColectionsDiv>
    )
}