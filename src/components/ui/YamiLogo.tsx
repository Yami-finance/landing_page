export function YamiLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yami-accent">
        <span className="text-lg font-bold text-yami-deep">Y</span>
      </div>
      <span className="text-lg font-bold tracking-tight text-white">Yami</span>
    </div>
  );
}
