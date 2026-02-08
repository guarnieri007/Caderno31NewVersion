import { ReactElement } from "react";
import { ItemAsCardDiv } from "../styles/common/itemAsCard-styles";
import { ItemAsCardProps } from "../../interfaces";
import { Button } from "./button";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { useTheme } from "styled-components";
import { Chip } from "../styles/common/common-styles";



export const ItemAsCard = ({ categories, title, price, image, profile_image, creators_name, currency,
    media_info: { amount_audios, amount_photos, amount_videos } }: ItemAsCardProps): ReactElement => {

    const GetCurrencyText = (currency: string): string => {
        if (currency === "real")
            return "R$";
        return "$";
    }

    const iconColor = useTheme().colors["text_hover"];
    const categoriesBGColor = useTheme().colors.button_text;
    const categoriesTextColor = useTheme().colors.text;

    return (
        <ItemAsCardDiv bg_image={`url(${image})`}>
            <div className="cardImage" >
                <div className="cardData">
                    <span className="price">
                        {categories.length > 0 && (
                            <div className="categories">
                                {categories.sort((a, b) => a.length - b.length).map((category, index) => (
                                    <Chip key={index} bg_color={categoriesBGColor} text_color={categoriesTextColor}>
                                        {category}
                                    </Chip>
                                ))}
                            </div>
                        )}
                        <div style={{ flexGrow: 1 }}>
                            <Chip bg_color={useTheme().colors.background_secondary} text_color={useTheme().colors.text}>
                                Assinante
                            </Chip>
                            <Button color="primary" loading={false} clicable={true} handleOnClick={() => { }} >{GetCurrencyText(currency)} {price}</Button>
                        </div>
                    </span>
                    <div className="cardAmountInfo">

                        {amount_videos > 0 ? (<div><Icon icon={UIIcons.Video} size={18} color={iconColor} /> <span>{amount_videos}</span></div>) : null}
                        {amount_photos > 0 ? (<div><Icon icon={UIIcons.Photo} size={18} color={iconColor} /> <span>{amount_photos}</span></div>) : null}
                        {amount_audios > 0 ? (<div><Icon icon={UIIcons.Audio} size={18} color={iconColor} /> <span>{amount_audios}</span></div>) : null}
                    </div>
                </div>
            </div>
            <div className="description">
                <span className="title">{title}</span>

                <div className="contentCreator">
                    <span className="profileImage"><img srcSet={profile_image} /></span>
                    <span className="creatorsName">{creators_name}</span>
                </div>
            </div>
        </ItemAsCardDiv>
    )

}