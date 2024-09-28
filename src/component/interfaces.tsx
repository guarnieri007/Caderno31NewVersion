import { ReactNode } from "react";

export interface HeroProps {
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