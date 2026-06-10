import { YamiLogo } from "@/components/ui/YamiLogo";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

const socials = [
  { label: "X", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "#", icon: "◎" },
  { label: "LinkedIn", href: "#", icon: "in" },
];

export function Footer() {
  return (
    <footer className="border-t border-yami-border bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <YamiLogo />
            <p className="mt-4 text-sm text-yami-muted">
              Behaviour is the ultimate collateral. Your financial reputation,
              finally visible.
            </p>
          </div>

          <ul className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-yami-muted transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-yami-border bg-yami-card/60 text-xs text-yami-muted transition-colors hover:border-yami-accent/30 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-yami-border pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-yami-muted">
              Yami is not a licensed lender. We provide infrastructure for
              peer-to-peer agreements between users. All lending activity is
              between individual users on the platform.
            </p>
            <p className="text-xs text-yami-muted shrink-0">
              © 2025 Yami Finance Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
