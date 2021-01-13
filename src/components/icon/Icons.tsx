import React from "react";
interface StrokeIconProps extends IconProps {
  children: React.ReactNode;
}
export interface IconProps {
  className?: string;
}

export const StrokeIcon = (props: StrokeIconProps) => (
  <div className={props.className}>
    <svg
      className="w-full h-full stroke-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      {props.children}
    </svg>
  </div>
);

export const LogoIcon = ({ className }: IconProps) => {
  return (
    <div className={className}>
      <svg
        className="w-full h-full fill-current"
        viewBox="0 -100 800 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M565 515 L550 550 L565 585 L600 600 L670 520 L700 450 L570 370 L500 350 L350 500 L300 650 L0 650 L147 297 L500 150 L712 238 L800 450 L764 594 L600 650 L530 620 L500 550 L530 480 L600 450 Z" />
      </svg>
    </div>
  );
};
