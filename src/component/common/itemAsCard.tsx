import { ReactElement } from "react";
import { ItemAsCardDiv } from "../styles/common/itemAsCard-styles";
import { ItemAsCardProps } from "../../interfaces";
import { Button } from "./button";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useTheme } from "styled-components";



export const ItemAsCard = ({ category, title, price, image, profile_image, creators_name, currency,
    media_info: { amount_audios, amount_photos, amount_videos } }: ItemAsCardProps): ReactElement => {

    const GetCurrencyText = (currency: string): string => {
        if(currency === "real")
            return "R$";
        return "$";
    }

    const iconColor = useTheme().colors["text_hover"];

    return (
        <ItemAsCardDiv bg_image={`url(${image})`}>
            <div className="cardImage" />
            <div className="cardData">
                <div className="cardAmountInfo">

                    {amount_videos > 0 ? (<div><Icon icon={UIIcons.Video} size={24} color={iconColor} /> <span>{amount_videos}</span></div>) : null}
                    {amount_photos > 0 ? (<div><Icon icon={UIIcons.Photo} size={24} color={iconColor} /> <span>{amount_photos}</span></div>) : null}
                    {amount_audios > 0 ? (<div><Icon icon={UIIcons.Audio} size={24} color={iconColor} /> <span>{amount_audios}</span></div>) : null}
                </div>
                <span className="price">
                    <Button color="primary" loading={false} clicable={true} handleOnClick={()=> {}} >{GetCurrencyText(currency)} {price}</Button>
                </span>
            </div>
            <div className="description">
                <span className="title">{title}</span>
                <span className="category">{category}</span>
                <div className="contentCreator">
                    <span className="profileImage"><img srcSet={profile_image} /></span>
                    <span className="creatorsName">{creators_name}</span>
                </div>
            </div>
        </ItemAsCardDiv>
    )

}