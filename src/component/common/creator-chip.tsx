import { ReactElement } from "react";
import { CreatorChipProps } from "../../component/interfaces";
import { CreatorChipDiv } from "../styles/common/common-styles";

export const CreatorChip = ({id, title, category, image }: CreatorChipProps): ReactElement => {
    return (
        <CreatorChipDiv key={id}>
            <img src={`${image}`} />
            <div>
                <h2>{title}</h2>
                <p>
                    {category}
                </p>
            </div>
        </CreatorChipDiv>
    )
}