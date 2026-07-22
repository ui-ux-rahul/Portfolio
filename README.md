# Portfolio & Creative Showcase

A premium, full-stack, offline-first portfolio and creative showcase designed for Rahul Dutta, Product Designer & Frontend Technologist.

## 🚀 Key Features

- **Sylvan-Style Interactive Hero Section**: Includes mouse-reactive dynamic canvas particles, high-end typography (Space Grotesk & JetBrains Mono), and a custom typewriter subtitle.
- **Custom-Tailored Page Transitions**: Embedded with full-page staggered entrance animation delays inside `src/App.tsx` via `motion` to improve perceived loading and data rendering performance.
- **Durable MongoDB Synchronization**: Syncs resume nodes, project cases, services, testimonials, blog modules, and configuration securely from a custom backend API layer.
- **Elegant Navigation Flow**: Centered top header menu links with clean visual alignment, alongside standard actions and dark/light system state tracking.
- **Admin Command Center**: Fully protected administrative portal enabling secure CRUD management of portfolio content, site meta configurations, and experience entries.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **React 19 & TypeScript**: Component-driven architecture using robust, modern custom hooks.
- **Tailwind CSS v4**: Utility-first CSS compiling with fluid visual configurations and dark theme overrides.
- **Framer Motion**: Smooth motion presets, staggering triggers, dynamic viewport entrance thresholds, and fluid layout transitions.
- **Lucide Icons**: Standardized, pixel-perfect vector glyph representation.

### Backend & API
- **Express Server (`server.ts`)**: Built with lightweight JSON serialization endpoints, asset fallback structures, and local static resource handlers.
- **Node.js**: Self-contained runtime leveraging type-stripped standard ES module bindings.
- **MongoDB integration (`src/db/mongodb.ts`)**: Direct collections handler providing seamless, structured cloud storage mapping.

---

## 🏗️ Production Build & Launch

To build and run the application locally or in a container, use the standard scripts:

```bash
# Install required workspace dependencies
npm install

# Start the Node.js development server
npm run dev

# Bundle the application for production
npm run build

# Start the compiled self-contained bundle
npm run start
```

### Script Specifications
- `npm run dev`: Boots the Express server using `tsx` on port `3000` with hot asset streaming.
- `npm run build`: Compiles the React client with Vite to `dist/`, then bundles `server.ts` to `dist/server.cjs` via `esbuild`.
- `npm run start`: Runs the compiled bundle in standard standalone production mode (`node dist/server.cjs`).
