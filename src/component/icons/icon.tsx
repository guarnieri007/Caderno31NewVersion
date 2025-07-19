import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import { UIIcons } from ".";

import AnexoIcon from "@/assets/icons/anexo.svg?react";
import AudioIcon from "@/assets/icons/audio_file.svg?react";
import BackspaceIcon from "../../assets/icons/backspace.svg?react";
import BookIcon from "../../assets/icons/book-open.svg?react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react"
import ChevronUpIcon from "@/assets/icons/chevron-up.svg?react"
import IdCardIcon from "@/assets/icons/id-card.svg?react";
import KeyIcon from "@/assets/icons/key.svg?react";
import LetterIcon from "@/assets/icons/letter.svg?react";
import LockIcon from "@/assets/icons/lock.svg?react";
import PauseIcon from "@/assets/icons/pause.svg?react";
import PhotoIcon from "@/assets/icons/photo.svg?react";
import PlayIcon from "@/assets/icons/play.svg?react";
import RetryErrorIcon from "@/assets/icons/retry_error.svg?react";
import SaveIcon from "@/assets/icons/save.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import UploadIcon from "@/assets/icons/upload.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";
import VideoIcon from "@/assets/icons/slideshow.svg?react";

import React from "react";


const Icon = ({ icon, ...rest }: IconProps): ReactElement => {
  const attr: React.SVGAttributes<SVGElement> = {
    width: rest.size,
    height: rest.size,
    fill: rest.color !== undefined ? rest.color : "#fff",
    ...rest,
  };

  const iconComponents = {
    [UIIcons.Anexo]: AnexoIcon,
    [UIIcons.Audio]: AudioIcon,
    [UIIcons.Backspace]: BackspaceIcon,
    [UIIcons.Book]: BookIcon,
    [UIIcons.ChevronDown]: ChevronDownIcon,
    [UIIcons.ChevronUp]: ChevronUpIcon,
    [UIIcons.IdCard]: IdCardIcon,
    [UIIcons.Key]: KeyIcon,
    [UIIcons.Letter]: LetterIcon,
    [UIIcons.Lock]: LockIcon,
    [UIIcons.Pause]: PauseIcon,
    [UIIcons.Photo]: PhotoIcon,
    [UIIcons.Play]: PlayIcon,
    [UIIcons.RecEmpty]: "",
    [UIIcons.RetryError]: RetryErrorIcon,
    [UIIcons.Save]: SaveIcon,
    [UIIcons.Trash]: TrashIcon,
    [UIIcons.Upload]: UploadIcon,
    [UIIcons.User]: UserIcon,
    [UIIcons.Video]: VideoIcon,

  };

   if (icon === UIIcons.RecEmpty) {
    const sizeInPx = rest.size + "px";

    // Render an invisible space holder (transparent box)
    return (
      <div
        style={{
          width: sizeInPx,
          height: sizeInPx,
          display: "inline-block",
          visibility: "hidden", // Keeps space, but doesn't show anything
        }}
        className={rest.className}
      />
    );
  }

  const IconComponent = iconComponents[icon];
  return IconComponent ? <IconComponent {...attr} /> : <></>;
};

export default Icon;

export interface IconProps {
  icon: UIIcons;
  size: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<SVGElement>;
}
