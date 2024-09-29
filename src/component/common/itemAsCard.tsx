import React, { ReactElement } from "react";
import { ItemAsCardDiv } from "../styles/common/itemAsCard-styles";
import { ItemAsCardProps } from "../interfaces";
import { Button } from "./inputs";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useTheme } from "styled-components";



export const ItemAsCard = ({ category, title, price, image, profileImage, creatorsName, currency,
    mediaInfo: { amountAudios, amountPhotos, amountVideos } }: ItemAsCardProps): ReactElement => {

    const GetCurrencyText = (currency: string): string => {
        if(currency === "real")
            return "R$";
        return "$";
    }

    const iconColor = useTheme().colors["text-color"];

    return (
        <ItemAsCardDiv $bg_image={`url(${image})`}>
            <div className="cardImage" />
            <div className="cardData">
                <div className="cardAmountInfo">

                    {amountVideos > 0 ? (<div><Icon icon={UIIcons.Video} size={30} color={iconColor} /> <span>{amountVideos}</span></div>) : null}
                    {amountPhotos > 0 ? (<div><Icon icon={UIIcons.Photo} size={30} color={iconColor} /> <span>{amountPhotos}</span></div>) : null}
                    {amountAudios > 0 ? (<div><Icon icon={UIIcons.Audio} size={30} color={iconColor} /> <span>{amountAudios}</span></div>) : null}
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