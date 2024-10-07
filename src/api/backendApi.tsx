import { Banner } from "@/component/common/banner";
import { CreatorChip } from "@/component/common/creator-chip";
import { ItemAsCard } from "@/component/common/itemAsCard";
import { MiniBannerLayout } from "@/component/common/miniBannerLayout";
import { BannerProps, CreatorChipProps, ItemAsCardProps } from "@/component/interfaces";
import { ContentCreatorDiv } from "@/component/styles/common/common-styles";
import React from "react";

export const FetchBestOfMonth = async () => {
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

export const FetchContentCreators = async () => {
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
};

export const FetchBanners = async () => {
  const response = await fetch('api/bannerItems');
  const content: BannerProps[] = await response.json();
  const banners = content.map(element => {
    const item = <Banner buttonText={element.buttonText} image={element.image} text={element.text} title={element.title} />
    return item;
  });
  return <MiniBannerLayout items={banners} />
};