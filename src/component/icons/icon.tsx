import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import { UIIcons } from ".";

import BookIcon from "../../assets/icons/book-open.svg";
import React from "react";


const Icon = ({ icon, ...rest }: IconProps): ReactElement => {
  const attr: React.SVGAttributes<SVGElement> = {
    width: rest.size,
    height: rest.size,
    color: rest.color || "var(--color-primary)",
    ...rest,
  };

  const iconComponents = {
    [UIIcons.Book]: BookIcon,
    [UIIcons.RecEmpty]: "",
  };

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
