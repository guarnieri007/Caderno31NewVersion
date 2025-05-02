import { ReactNode } from "react";
import { UIIcons } from "./icons";

export interface HeroProps {
    heroId: number;
    title?: string;
    text?: string;
    buttonText?: string;
    handleClickButton?: () => void;
    $bgcolor?: string;
    image?: string;
}

export interface ItemsColectionsProps {
    title: string;
    children: ReactNode;
}

export interface CreatorChipProps {
    id: number;
    title: string;
    category: string;
    image?: string;
}

export interface BannerProps {
    title: string;
    text: string;
    buttonText: string;
    image: string;
}

export interface MiniBannerLayoutProps {
    items: ReactNode[];
}

export interface BannerDivProps {
    $bg_image?: string;
}

export interface MediaInformation {
    amountVideos: number;
    amountPhotos: number;
    amountAudios: number;
}

export interface ItemAsCardProps {
    cardId: number;
    creatorsName: string;
    image: string;
    title: string;
    category: string;
    price: number;
    profileImage: string;
    mediaInfo: MediaInformation;
    currency: "real" | "dolar";
}

export interface CarrouselProps {
    children: ReactNode[];
}

export interface InputFIeldProps {
    label: string;
    name: string;
    placeHolder: string;
    icon?: UIIcons;
    instructionsLabel?: string;
    instructions?: string[];
    errors?: string[];
    maxLength: number;
    type?: string;
    value?: unknown;
}