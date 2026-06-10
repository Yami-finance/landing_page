import { type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  className = "",
  glass = true,
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-yami-border",
        glass ? "bg-yami-card/60 backdrop-blur-md" : "bg-yami-card",
        paddingMap[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
