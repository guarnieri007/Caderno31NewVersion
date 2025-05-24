import { ReactNode } from "react";
import { UIIcons } from "./component/icons";

export interface HeroProps {
    id_hero: number;
    title?: string;
    text?: string;
    text_button?: string;
    handleClickButton?: () => void;
    bg_color?: string;
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
    text_button: string;
    image: string;
}

export interface MiniBannerLayoutProps {
    items: ReactNode[];
}

export interface BannerDivProps {
    bg_image?: string;
}

export interface MediaInformation {
    amount_videos: number;
    amount_photos: number;
    amount_audios: number;
}

export interface ItemAsCardProps {
    id_card: number;
    creators_name: string;
    image: string;
    title: string;
    category: string;
    price: number;
    profile_image: string;
    media_info: MediaInformation;
    currency: "real" | "dolar";
}

export interface CarrouselProps {
    children: ReactNode[];
}

export interface InputFIeldProps {
    label: string;
    name: string;
    placeholder: string;
    icon?: UIIcons;
    label_instructions?: string;
    instructions?: string[];
    errors?: string[];
    maxLength: number;
    type?: string;
    value?: unknown;
}

export interface AcessTokenResponse {
  data?: {
    accessToken: string;
  };
}

export interface CreateNewCredentialProps {
  data: {
    email: string;
    username: string;
    password: string;
  }
}

export interface User {
  username: string;
  email: string;
  role?: string;
}

export interface LabelProps {
  label: string;
  length: number;
  maxLength: number;
  is_focused: boolean;
  forInput: string;
}

export interface AuthContextType {
  access_Token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string) => void;
  accessTokenRefresh: () => Promise<void>;
  getUserData: (token?: string) => Promise<User | undefined>;
  createCredential: (data: CreateNewCredentialProps) => Promise<void>;
}

export interface CategoryProps {
  ds_category: string;
  cd_category: number;
  status: string;
}

export interface CategorySelectorProps {
  all_categories: CategoryProps[],
  max_selection: number,
  selected_categories: CategoryProps[],
  name: string,
  placeHolder?: string,
}