# Raj Suryavanshi - 3D Developer Portfolio

## Overview
A professional, modern, minimalistic 3D developer portfolio website for Raj Suryavanshi - Full Stack Developer & CSE Student. Built with React, React Three Fiber, Framer Motion, and Supabase backend.

## Current State
**COMPLETE** - All sections implemented and tested. Ready for production deployment.

## Features
- **3D Developer Character**: Interactive 3D head model with eyes that follow the mouse cursor
- **Eye Tracking**: Smooth lerping animation for realistic eye movement on desktop and mobile
- **3D Background Scene**: Rotating sphere, geometric wireframes, and particle effects
- **WebGL Fallback**: Graceful CSS-based animated fallback for environments without GPU support
- **Glassmorphism Design**: Dark theme with frosted glass effects and soft gradients
- **Smooth Animations**: Framer Motion staggered reveals and scroll-triggered animations
- **Resume Section**: Download and view resume with highlight cards
- **Responsive Layout**: Works across desktop, tablet, and mobile devices
- **Contact Form**: Supabase integration for storing submissions

## Tech Stack
- **Frontend**: React + Vite + TypeScript
- **3D Graphics**: React Three Fiber, @react-three/drei, Three.js
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with glassmorphism effects
- **Backend**: Supabase (PostgreSQL)
- **State Management**: TanStack Query
- **Routing**: Wouter

## Project Structure
```
/
├── client/                    # Frontend React application
│   ├── public/               # Static assets (favicon, resume.pdf)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   │   ├── ThreeScene.tsx      # 3D background scene with particles
│   │   │   ├── DeveloperScene.tsx  # 3D developer character wrapper
│   │   │   ├── DeveloperModel.tsx  # 3D head with eye tracking
│   │   │   ├── Navbar.tsx          # Fixed glassmorphic navigation
│   │   │   ├── Hero.tsx            # Hero with 3D character + text
│   │   │   ├── About.tsx           # Summary + technical skills grid
│   │   │   ├── Experience.tsx      # Work experience timeline
│   │   │   ├── Projects.tsx        # Project showcase cards
│   │   │   ├── Education.tsx       # Education timeline
│   │   │   ├── Resume.tsx          # Resume section with download
│   │   │   └── Contact.tsx         # Contact form with Supabase
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useMousePosition.ts  # Mouse/touch position tracking
│   │   │   └── use-mobile.tsx       # Mobile detection
│   │   ├── lib/              # Utility libraries
│   │   │   ├── supabaseClient.ts  # Supabase client
│   │   │   ├── queryClient.ts     # TanStack Query client
│   │   │   └── utils.ts           # Helper functions
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx          # Main portfolio page
│   │   │   └── not-found.tsx     # 404 page
│   │   ├── App.tsx           # Root component with routing
│   │   ├── main.tsx          # Application entry point
│   │   └── index.css         # Global styles & CSS variables
│   └── index.html            # HTML template
├── server/                   # Express backend (for local dev)
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── static.ts            # Static file serving
│   └── vite.ts              # Vite dev server integration
├── shared/                   # Shared types and schemas
│   └── schema.ts            # Drizzle ORM schema
├── script/                   # Build scripts
│   └── build.ts             # Production build script
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Environment Variables (Required for Contact Form)
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Supabase Setup
To enable the contact form, run this SQL in your Supabase Dashboard > SQL Editor:

```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Design System
- **Colors**: Dark navy/black background (#030712), white/grey text, blue accents (#3b82f6)
- **Typography**: Inter font family
- **Effects**: Glassmorphism with backdrop blur, soft gradients, smooth Framer Motion animations
- **3D Elements**: Rotating sphere with distort material, wireframe geometric shapes, floating particles

## Development
```bash
npm run dev     # Start development server on port 5000
npm run build   # Build for production
npm run start   # Run production server
```

## Deployment (Vercel)
The project is configured for Vercel deployment:
- Build command: `npm run build`
- Output directory: `dist/public`
- Framework: Vite
- SPA routing configured via rewrites

**Important**: Set environment variables in Vercel Dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Redeploy the project

## Recent Changes
- Added 3D developer character with eye tracking in Hero section
- Created DeveloperModel component with realistic eye movement
- Added Resume section with download/view functionality
- Fixed Vercel deployment configuration (outputDirectory: dist/public)
- Added SPA routing rewrites for client-side navigation
- Moved project files from nested folder to root for cleaner structure
- Added WebGL capability detection with graceful CSS fallback
- Error boundary wrapping 3D scenes for graceful degradation
