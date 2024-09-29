import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import { UIIcons } from ".";

import BookIcon from "../../assets/icons/book-open.svg?react";
import AudioIcon from "@/assets/icons/audio_file.svg?react";
import PhotoIcon from "@/assets/icons/photo.svg?react";
import VideoIcon from "@/assets/icons/slideshow.svg?react";
import React from "react";


const Icon = ({ icon, ...rest }: IconProps): ReactElement => {
  const attr: React.SVGAttributes<SVGElement> = {
    width: rest.size,
    height: rest.size,
    fill: rest.color,
    ...rest,
  };
  
  const iconComponents = {
    [UIIcons.Audio]: AudioIcon,
    [UIIcons.Book]: BookIcon,
    [UIIcons.Photo]: PhotoIcon,
    [UIIcons.RecEmpty]: "",
    [UIIcons.Video]: VideoIcon,
  };
  
  const IconComponent = iconComponents[icon];
  return IconComponent ? <IconComponent {...attr} /> : <></>;
};

export default Icon;

export interface IconProps {
  icon: UIIcons;
  size: number;
  color: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<SVGElement>;
}
