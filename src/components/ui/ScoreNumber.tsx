import { type HTMLAttributes } from "react";

export interface ScoreNumberProps extends HTMLAttributes<HTMLSpanElement> {
  value: string;
  size?: "sm" | "lg" | "xl";
}

const sizeStyles = {
  sm: "text-4xl leading-none",
  lg: "text-5xl leading-none sm:text-6xl",
  xl: "text-[6rem] leading-none sm:text-[8rem] lg:text-[10rem]",
};

export function ScoreNumber({
  value,
  size = "sm",
  className = "",
  ...props
}: ScoreNumberProps) {
  return (
    <span
      className={[
        "font-sine font-medium text-yami-accent tracking-normal",
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {value}
    </span>
  );
}
