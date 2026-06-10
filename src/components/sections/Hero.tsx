import Image from "next/image";
import { Button } from "@/components/ui/Button";
import yamiIcon from "@/assets/icons/yami_icon.svg";
import avatarStack from "@/assets/images/avatar-stack.svg";
import heroMobileImg from "@/assets/images/hero_mobile_img.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-yami-deep">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(210,245,62,0.06)_0%,_transparent_50%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24 lg:px-8">
        {/* Left column */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yami-border bg-yami-card/60 px-4 py-1.5 backdrop-blur-md">
            <Image
              src={yamiIcon}
              alt=""
              width={24}
              height={19}
              className="h-5 w-auto shrink-0"
              priority
            />
            <span className="text-sm font-medium text-yami-accent">
              The Campus Credit Network
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Your Financial{" "}
            <span className="text-yami-accent">Reputation, Finally</span>{" "}
            Visible.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-yami-muted">
            Yami formalises the student lending networks that already exist
            across Nigerian campuses — with trust scores, structured agreements,
            and real accountability.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#early-access">
              <Button>Join the Waitlist</Button>
            </a>
            <a href="#how-it-works">
              <Button variant="secondary">See How It Works</Button>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Image
              src={avatarStack}
              alt="Students from 12 universities"
              width={149}
              height={45}
              className="h-11 w-auto shrink-0"
            />
            <p className="text-sm text-yami-muted">
              Trusted by students across{" "}
              <span className="font-semibold text-yami-accent">
                12 universities
              </span>
            </p>
          </div>
        </div>

        {/* Right column — app mockup */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative mx-auto lg:mx-0 lg:max-w-[420px]">
            <div className="absolute -inset-4 rounded-3xl bg-yami-accent/5 blur-2xl" />
            <Image
              src={heroMobileImg}
              alt="Yami app dashboard showing balance, borrow and lend actions, and active loans"
              width={420}
              height={520}
              className="relative w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
