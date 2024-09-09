import { ReactNode } from "react";

export interface HeroProps {
    title?: string;
    text?: string;
    buttonText?: string;
    handleClickButton?: () => void;
    bgColor?: string;
    image?: string;
}

export interface ItemsColectionsProps {
    title: string;
    children: ReactNode;
}

export interface CreatorChipProps {
    title: string;
    category: string;
    image?: string;
}

export interface BannerProps {
    title: string;
    text: string;
    buttonText: string;
    image: string;
    actionText: string | null;
}