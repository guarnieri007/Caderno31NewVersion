import { CreatorChip } from "@/component/common/creator-chip";
import { ItemAsCard } from "@/component/common/itemAsCard";
import { CreatorChipProps, ItemAsCardProps } from "@/component/interfaces";
import { ContentCreatorDiv } from "@/component/styles/common/common-styles";
import React from "react";

export const fetchBestOfMonth = async () => {
  const response = await fetch('/api/bestofmonth');
  const content: ItemAsCardProps[] = await response.json();

  const result =
    <ContentCreatorDiv>
      {content.map((item) => {
        return (
          <ItemAsCard key={item.cardId} {...item} />
        )
      })}
    </ContentCreatorDiv >

  return result;
};

export const fetchContentCreators = async () => {
  const response = await fetch('api/contentCreator');
  const content: CreatorChipProps[] = await response.json();

  const creatorChipItems =
    <ContentCreatorDiv>
      {content.map((item) => {
        return (
          <CreatorChip key={item.id} {...item} />
        )
      })}
    </ContentCreatorDiv>

  return creatorChipItems;
}