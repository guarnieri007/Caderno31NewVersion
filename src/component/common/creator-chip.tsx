import { ReactElement } from "react";
import { CreatorChipProps } from "../../interfaces/interfaces";
import { CreatorChipDiv } from "../styles/common/common-styles";
import { Button } from "./button";

export const Chip = ({id, title, category, image }: CreatorChipProps): ReactElement => {
    return (
        <CreatorChipDiv key={id}>
            <img src={`${image}`} />
            <div>
                <h2>{title}</h2>
                <Button color="primary">{category}</Button>
            </div>
        </CreatorChipDiv>
    )
}

Chip.displayName = "Chip";