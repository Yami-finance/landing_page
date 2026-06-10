# Specification & Master Prompt: Yami Landing Page

This document provides architectural guidelines, design tokens, component breakdowns, and iterative prompts to build the high-fidelity landing page for **Yami**—a student peer-to-peer lending infrastructure platform based in Nigeria.

---

## 1. System Architecture & File Structure

We follow a modular, clean component architecture. Every section of the landing page is isolated into its own file under `components/sections/`, while reusable base elements sit in `components/ui/`.

```text
src/
├── app/
│   ├── layout.tsx         # Root layout (Fonts, Meta, Providers)
│   └── page.tsx           # Assembly of all landing sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Desktop & Mobile navigation
│   │   └── Footer.tsx     # Bottom links, legal, socials
│   ├── sections/
│   │   ├── Hero.tsx       # Value proposition + Interactive App Mockup
│   │   ├── Problem.tsx    # 4-grid current gaps analysis
│   │   ├── Solution.tsx   # Core features & trust scale stat
│   │   ├── Centrepiece.tsx# Large 791 visual & trust indicators
│   │   ├── HowItWorks.tsx # Step-by-step flow with Borrow/Lend toggle
│   │   ├── AppPreview.tsx # Dense bento grid of internal UI features
│   │   ├── Stats.tsx      # Numerical proof points & dual testimonials
│   │   └── FAQ.tsx        # Accordion-style interactive questions
│   └── ui/
│       ├── Button.tsx     # Shared bespoke button components
│       └── Card.tsx       # Reusable glassmorphic borders/containers