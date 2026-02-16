# SkillSync - AI-Powered Talent Alignment Platform

A production-ready, beautifully styled Next.js marketing and product demo site for SkillSync, an AI-powered talent alignment platform focused on the Sri Lankan tech sector.

## Features

- 🎨 **Modern, Premium UI** - Beautiful design with gradients, shadows, glassmorphism, and smooth animations
- 🚀 **Next.js 15** - Built with the latest App Router and React Server Components
- 🎭 **Framer Motion** - Smooth entrance animations and interactions
- 🎨 **Tailwind CSS** - Fully styled with utility classes and custom design tokens
- 📱 **Responsive Design** - Works beautifully on all devices
- ☀️ **Light Theme UI** - Clean, professional light mode design throughout

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles and Tailwind utilities
│   └── demo/
│       ├── student/            # Student dashboard demo
│       ├── corporate/          # Corporate/recruiter dashboard demo
│       └── university/         # University analytics dashboard demo
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── marketing/              # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Metrics.tsx
│   │   ├── Personas.tsx
│   │   ├── ProductStrip.tsx
│   │   ├── CTA.tsx
│   │   ├── ProblemSolution.tsx
│   │   └── HowItWorks.tsx
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
└── lib/
    └── utils.ts                # Utility functions (cn, etc.)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Pages

- **Landing Page** (`/`) - Marketing site with hero, features, metrics, personas, and CTAs
- **Student Demo** (`/demo/student`) - Student dashboard with profile, job matches, and skill insights
- **Corporate Demo** (`/demo/corporate`) - Recruiter dashboard with candidate pipeline and AI matching
- **University Demo** (`/demo/university`) - University analytics dashboard with program performance and outcomes

## Design System

The project uses a comprehensive design system with:

- **Colors**: Primary (blue), Secondary (purple), and semantic colors
- **Typography**: Display and sans-serif fonts
- **Components**: Button variants (primary, secondary, ghost, outline), Cards, Badges
- **Utilities**: Glassmorphism, gradients, shadows, animations

All styles are defined in `src/app/globals.css` using Tailwind's `@layer components`.

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React CountUp** - Number animations
- **Class Variance Authority** - Component variants
- **clsx & tailwind-merge** - Class name utilities

## Notes

- All data is **mock data** - no API calls are made
- All links are functional for navigation within the app
- The design is optimized for a premium SaaS landing page feel
- Light theme only - dark mode has been removed for clean, consistent branding

## License

This project is private and proprietary.
