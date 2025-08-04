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
  is_focused?: boolean;
  forInput: string;
  counting?: boolean;
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

export interface CategorySelectorProps {
  all_categories: ResponseCategory[],
  max_selection: number,
  selected_categories: ResponseCategory[],
  name: string,
  placeHolder?: string,
  languages: ResponseLanguage[],
}

export interface UploadFile {
  file: File;
  progress: number;
  status: "uploading" | "paused" | "error" | "done" | "waiting";
  fileId: string;
  currentChunk: number;
  totalChunks: number;
  xhr?: XMLHttpRequest;
}

export interface UploadFileProps {
  uploadFiles: UploadFile[];
  path: string;
}

export interface LanguageTranslation {
  cd_language: number;
  cd_translation_lang: number;
  ds_language: string;
}

export interface ResponseLanguage {
  cd_language: number;
  ds_language_short: string;
  slug: string;
  nameTranslations: LanguageTranslation[];
  languageTranslations: LanguageTranslation[];
}

export interface CategoryTranslation {
  cd_category: number;
  cd_language: number;
  ds_category: string;
}

export interface ResponseCategory {
  cd_category: number;
  translations: CategoryTranslation[];
}

export interface PostTypeTranslation {
  cd_post_type: number;
  cd_language: number;
  ds_post_type: string;
}

export interface ResponsePostType {
  cd_post_type: number;
  translations: PostTypeTranslation[];
  slug: string;
}