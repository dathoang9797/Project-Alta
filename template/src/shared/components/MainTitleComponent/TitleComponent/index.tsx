import React from "react";
import { memo } from "react";
interface IProps {
  title: string|React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}
const TitleComponent = (props: IProps) => {
  const className = props?.index == 2 ? 'secondary-title' : 'main-title';
  return (
    <p className={`${className} ${props.className}`} style={props.style}>
      {props.title}
    </p>
  );
};

export default memo(TitleComponent);
