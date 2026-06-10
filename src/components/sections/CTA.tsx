"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const universities = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Ahmadu Bello University (ABU)",
  "University of Abuja",
  "Other",
];

export function CTA() {
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");

  return (
    <section
      id="early-access"
      className="relative bg-yami-deep py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(210,245,62,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
          Early Access
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Be among the first students to build their financial reputation.
        </h2>
        <p className="mt-4 text-yami-muted">
          We&apos;re launching campus by campus. Join the waitlist for your
          school.
        </p>

        <form
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="flex-1 rounded-full border border-yami-border bg-yami-card/60 px-5 py-3 text-sm text-white backdrop-blur-md focus:border-yami-accent/50 focus:outline-none focus:ring-1 focus:ring-yami-accent/30"
            aria-label="Select University"
          >
            <option value="" disabled className="bg-yami-deep">
              Select University
            </option>
            {universities.map((uni) => (
              <option key={uni} value={uni} className="bg-yami-deep">
                {uni}
              </option>
            ))}
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@university.edu.ng"
            className="flex-1 rounded-full border border-yami-border bg-yami-card/60 px-5 py-3 text-sm text-white placeholder:text-yami-muted/60 backdrop-blur-md focus:border-yami-accent/50 focus:outline-none focus:ring-1 focus:ring-yami-accent/30"
            aria-label="Email address"
          />

          <Button type="submit" size="lg" className="shrink-0">
            Get Waitlisted
          </Button>
        </form>

        <p className="mt-6 text-xs text-yami-muted">
          No spam. No pressure. Just early access.
        </p>
      </div>
    </section>
  );
}
