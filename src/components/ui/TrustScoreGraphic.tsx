import Image from "next/image";
import trustScoreMain from "@/assets/images/trustscoremain.svg";

const sizeStyles = {
  sm: "h-10 w-auto sm:h-11",
  md: "h-12 w-auto sm:h-14",
  lg: "mx-auto h-20 w-auto max-w-full sm:h-28 lg:h-32",
};

export function TrustScoreGraphic({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Image
      src={trustScoreMain}
      alt="791"
      width={626}
      height={143}
      className={[sizeStyles[size], className].filter(Boolean).join(" ")}
      priority={size === "lg"}
    />
  );
}
