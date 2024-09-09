import React, { ReactElement } from "react";
import { CreatorChipProps } from "@/component/interfaces";
import { CreatorChipDiv } from "@/component/common/common-styles"

export const CreatorChip = ({ title, category, image }: CreatorChipProps): ReactElement => {
    return (
        <CreatorChipDiv>
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