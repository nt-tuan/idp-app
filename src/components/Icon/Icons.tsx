import React from "react";
import { IconProps } from "./props";
interface StrokeIconProps extends IconProps {
  children: React.ReactNode;
}
export const StrokeIcon = (props: StrokeIconProps) => (
  <span className={props.className}>
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
  </span>
);

export const EditIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </StrokeIcon>
);

export const DeleteIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </StrokeIcon>
);

export const UserIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </StrokeIcon>
);

export const KeyIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    />
  </StrokeIcon>
);

export const ArrowRight = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </StrokeIcon>
);

export const LockIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </StrokeIcon>
);

export const UnlockIcon = ({ className }: IconProps) => (
  <StrokeIcon className={className}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
    />
  </StrokeIcon>
);

export const LogoIcon = ({ className }: IconProps) => {
  return (
    <div className={className}>
      <svg
        className="w-full h-full fill-current"
        viewBox="0 0 800 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M565 515 L550 550 L565 585 L600 600 L670 520 L700 450 L570 370 L500 350 L350 500 L300 650 L0 650 L147 297 L500 150 L712 238 L800 450 L764 594 L600 650 L530 620 L500 550 L530 480 L600 450 Z" />
      </svg>
    </div>
  );
};
