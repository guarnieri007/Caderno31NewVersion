import { ReactNode, ChangeEvent, InputHTMLAttributes } from "react";
import { UIIcons } from "../component/icons";

export interface AcessTokenResponse {
  data?: {
    accessToken: string;
  };
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
  firstFetching: boolean;
}

export interface BannerDivProps {
  bg_image?: string;
  $text_color?: string;
}

export interface BannerProps {
  title: string;
  text: string;
  text_button: string;
  image: string;
}

export interface CarrouselProps {
  children: ReactNode[];
}

export interface CategorySelectorProps {
  all_categories: ResponseCategory[];
  max_selection: number;
  selected_categories: ResponseCategory[];
  name: string;
  placeHolder?: string;
  languages: ResponseLanguage[];
}

export interface CategoryTranslation {
  cd_category: number;
  cd_language: number;
  ds_category: string;
}

export interface CreateNewCredentialProps {
  data: {
    email: string;
    username: string;
    password: string;
  };
}

export interface CreatePostProps {
  translations: PostTranslation[];
  categories: ResponseCategory[];
  postTypes: ResponsePostType[];
  price: number | null;
  files: UploadFilePayload[] | null;
}

export interface CreatorChipProps {
  id: number;
  title: string;
  category: string;
  image?: string;
}

export interface DropdownSelectorProps<TItem, TValue extends string | number> {
  categories: TItem[];
  value: TValue | null; // controlled
  onChange: (value: TValue | null, item: TItem | null) => void;

  filterFunction: (search: string, list: TItem[], cd_language: number) => TItem[];

  name: string;
  placeHolder: string;
  label: string;
  cd_language: number;

  getValue: (item: TItem) => TValue;
  getLabel: (item: TItem, language: number) => string;
}


export interface ForgotPasswordContextType {
  forgotPwHandler: (email: string) => Promise<void>;
}

export interface HeroProps {
  id_hero: number;
  title?: string;
  text?: string;
  text_button?: string;
  handleClickButton?: () => void;
  bg_color?: string;
  image?: string;
  text_color?: string;
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
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputFields?: InputHTMLAttributes<HTMLInputElement>;
  labelValue?: string | number;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  restrictMaxLengthByText?: boolean;
}

export interface ItemAsCardProps {
  id_card: number;
  creators_name: string;
  image: string;
  title: string;
  categories: string[];
  price: number;
  profile_image: string;
  media_info: MediaInformation;
  currency: "real" | "dolar";
}

export interface ItemsColectionsProps {
  title: string;
  children: ReactNode;
}

export interface LabelProps {
  label: string;
  length: number;
  maxLength: number;
  is_focused?: boolean;
  forInput: string;
  counting?: boolean;
}

export interface LanguageTranslation {
  cd_language: number;
  cd_translation_lang: number;
  ds_language: string;
}

export interface MediaInformation {
  amount_videos: number;
  amount_photos: number;
  amount_audios: number;
}

export interface MiniBannerLayoutProps {
  items: ReactNode[];
}

export interface Post {
  cd_post: number;
  translations: PostTranslation[];
  categories: ResponseCategory[];
  postTypes: ResponsePostType[];
  price: number | null;
  files: UploadFile[] | null;
}

export interface PostContextType {
  posts: Post[];
  listPosts: () => Promise<void>;
  getPost: (cd_post: number) => Promise<Post | null>;
  createPost: (data: CreatePostProps) => Promise<Post | undefined>;
  updatePost: (cd_post: number, data: CreatePostProps) => Promise<Post | undefined>;
  deletePost: (cd_post: number) => Promise<void>;
}

export interface PostTranslation {
  cd_language: number;
  ds_post: string;
}

export interface PostTypeTranslation {
  cd_post_type: number;
  cd_language: number;
  ds_post_type: string;
}

export interface ResponseCategory {
  cd_category: number;
  translations: CategoryTranslation[];
}

export interface ResponseLanguage {
  cd_language: number;
  ds_language_short: string;
  slug: string;
  nameTranslations: LanguageTranslation[];
  languageTranslations: LanguageTranslation[];
}

export interface ResponsePostType {
  cd_post_type: number;
  translations: PostTypeTranslation[];
  slug: string;
}

export interface ThemeType {

  spacings: {
    biger: string;
    big: string;
    normal: string;
    reduced: string;
    small: string;
    min: string;
  };

  borderRadius: {
    small: string,
    mediumX0: string,
    mediumX1: string,
    mediumX2: string,
    large: string,
  }

  colors: {
    primary: string,
    primary_hover: string,
    border_default: string,
    hero_text: string,
    background_primary: string,
    background_secondary: string,
    background_card: string,
    text: string,
    text_hover: string,
    button_text: string,
    button_text_hover: string,
    button_background: string,
    placeHolder: string,
    placeHolder_focus: string,
    error: string,
    success: string,
  },
}

export interface UploadAreaProps {
  uploads: UploadFile[];
  addFiles: (files: File[]) => void;
  retryUpload: (file: File) => void;
  removeUpload: (file: File) => void;
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

export interface UploadFilePayload {
  url: string;
  type: string;
  size: number;
}

export interface UploadFileProps {
  uploadFiles: UploadFile[];
  path: string;
}

export interface User {
  username: string;
  email: string;
  role?: string;
}