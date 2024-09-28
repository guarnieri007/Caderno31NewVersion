import React, { ReactElement } from "react";
import { ItemAsCardDiv } from "../styles/common/itemAsCard-styles";
import { ItemAsCardProps } from "../interfaces";
import imageIcon from "@/assets/icons/photo.svg";
import videoIcon from "@/assets/icons/slideshow.svg";
import audioIcon from "@/assets/icons/audio_file.svg";
import { Button } from "./inputs";




export const ItemAsCard = ({ category, title, price, image, profileImage, creatorsName, currency,
    mediaInfo: { amountAudios, amountPhotos, amountVideos } }: ItemAsCardProps): ReactElement => {

    const GetCurrencyText = (currency: string): string => {
        if(currency === "real")
            return "R$";
        return "$";
    }
    console.log("testando imagem svg", imageIcon);
    return (
        <ItemAsCardDiv $bg_image={`url(${image})`}>
            <div className="cardImage" />
            <div className="cardData">
                <div className="cardAmountInfo">

                    {amountVideos > 0 ? (<div><img srcSet={videoIcon} /> <span>{amountVideos}</span></div>) : null}
                    {amountPhotos > 0 ? (<div><img srcSet={imageIcon} /> <span>{amountPhotos}</span></div>) : null}
                    {amountAudios > 0 ? (<div><img srcSet={audioIcon} /> <span>{amountAudios}</span></div>) : null}
                </div>
                <span className="price">
                    <Button color="primary" >{GetCurrencyText(currency)} {price}</Button>
                </span>
            </div>
            <div className="description">
                <span className="title">{title}</span>
                <span className="category">{category}</span>
                <div className="contentCreator">
                    <span className="profileImage"><img srcSet={profileImage} /></span>
                    <span className="creatorsName">{creatorsName}</span>
                </div>
            </div>
        </ItemAsCardDiv>
    )

}