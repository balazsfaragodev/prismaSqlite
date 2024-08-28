import { Children, isValidElement } from "react";
import { ButtonProps, ButtonType } from "@/app/lib/types";
import Image from "next/image";
import clsx from "clsx";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  buttonType,
  type = "button",
  className,
  isActive = false,
}) => {
  // Check for text and icon
  let hasIcon = false;
  let hasText = false;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Image || child.type === "img") {
        hasIcon = true;
      }
    }
    if (typeof child === "string") {
      hasText = true;
    }
  });

  const paddingClasses = clsx({
    "pl-3 pr-4": hasIcon && hasText,
    "px-2": hasIcon && !hasText,
    "px-4": !hasIcon && hasText,
  });

  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "flex justify-center items-center gap-2 py-2 ",
        paddingClasses,
        className,
        {
          "rounded-lg bg-Grey-60 hover:bg-Grey-50 active:bg-Grey-40":
            buttonType === ButtonType.PRIMARY,
          "rounded-lg hover:bg-Grey-90 active:bg-Grey-80":
            buttonType === ButtonType.SECONDARY && !isActive,
          "rounded-lg bg-Grey-80":
            buttonType === ButtonType.SECONDARY && isActive,
          "border border-Grey-20 bg-gradient-to-b from-Grey-60 to-Grey-60 rounded-full hover:bg-Grey-60":
            buttonType === ButtonType.SPECIAL,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
