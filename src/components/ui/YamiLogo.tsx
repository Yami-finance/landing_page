import Image from "next/image";
import yamiIcon from "@/assets/icons/yami_icon.svg";

export function YamiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={yamiIcon}
        alt="Yami"
        width={40}
        height={32}
        className="h-8 w-auto"
        priority
      />
      <span className="text-lg font-bold tracking-tight text-white">Yami</span>
    </div>
  );
}
