# Angelic Shipchandlers

A website for Angelic Shipchandlers Enterprises Limited, a ship chandler based in Mombasa, Kenya. It presents the company's vessel supply and support services, searchable supply categories, company/contact information, and a guided vessel quote request that can be sent through WhatsApp.

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Environment variables](#environment-variables)
- [Running the project](#running-the-project)
- [Routes and API](#routes-and-api)
- [Database](#database)
- [Usage](#usage)
- [Testing and troubleshooting](#testing-and-troubleshooting)
- [Contributing and license](#contributing-and-license)

## Features

- Responsive company website with home, about, services, supply range, contact, and vessel quote pages.
- Service details for provisions and bonded stores, technical marine stores, marine equipment and spare parts, customs and logistics, and inspection, maintenance, and repairs.
- Supply catalogue grouped into food and provisions, vessel and cabin, and technical marine stores, with category filters and text search.
- Five-step vessel request form covering vessel, port call, requirements, contact, and review. Form fields are validated in the browser; the completed request can be composed as a WhatsApp message.
- Static image assets and page metadata for search and social previews.

## Tech stack

- **Language:** TypeScript
- **UI:** React 19
- **Application framework and routing:** TanStack Start and TanStack Router (file-based routes)
- **Build and development server:** Vite, with the Lovable TanStack configuration and Nitro build integration
- **Styling:** Tailwind CSS 4, `tw-animate-css`, and project CSS variables
- **UI and utilities:** Radix UI, Lucide React, `class-variance-authority`, `clsx`, and `tailwind-merge`
- **Form validation:** Zod
- **Testing:** Vitest, jsdom, and React Testing Library
- **Package managers/lockfiles:** npm (`package-lock.json`) and Bun (`bun.lock`)

## Project structure

```text
.
├── public/                  # Public files served as-is (for example robots.txt and favicon)
├── src/
│   ├── assets/              # Hero and service photography
│   ├── components/
│   │   ├── home/             # Home page sections and hero
│   │   ├── layout/           # Site header, footer, and WhatsApp button
│   │   ├── rfq/              # Vessel request form
│   │   ├── shared/           # Reusable presentation components
│   │   ├── supply/           # Supply catalogue
│   │   └── ui/               # Radix-based UI components
│   ├── data/                 # Company details, services, supply catalogue, and media registry
│   ├── hooks/                # Shared React hooks
│   ├── lib/                  # Error handling and shared utilities
│   ├── routes/               # File-based TanStack routes and root application shell
│   ├── test/                 # Vitest setup and routing tests
│   ├── router.tsx            # TanStack Router creation
│   ├── routeTree.gen.ts      # Generated route tree; do not edit by hand
│   ├── server.ts             # Server entry and SSR error handling
│   ├── start.ts              # TanStack Start middleware setup
│   └── styles.css            # Tailwind imports and design system
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # npm dependency lockfile
├── bun.lock                  # Bun dependency lockfile
├── vite.config.ts            # Vite/TanStack Start configuration
├── vitest.config.ts           # Vitest configuration
├── tsconfig.json              # TypeScript configuration and @/* alias
└── components.json            # UI component generator configuration
```

Routes are defined by files in `src/routes/`. The generated `src/routeTree.gen.ts` should be left to the router tooling.

## Prerequisites

- Node.js **22.12.0 or later**. TanStack Start in the installed dependency set requires this version.
- npm (included with Node.js), or Bun if you prefer the included Bun lockfile.
- Git to clone the repository.

## Installation and setup

1. Clone the repository and enter the project directory:

   ```sh
   git clone <repository-url>
   cd angelic-shipchandlers
   ```

2. Install dependencies with npm:

   ```sh
   npm ci
   ```

   Or install with Bun:

   ```sh
   bun install
   ```

3. Start the development server as described in [Running the project](#running-the-project).

No database or application-specific secret configuration is needed for local development.

## Environment variables

The current application does not read project-specific environment variables, and no `.env.example` is required. The Vite configuration includes `VITE_*` environment injection, but no `VITE_*` variables are referenced by the application source.

The company email and website are intentionally empty in `src/data/company.ts` pending confirmation. They are not environment variables. Vessel requests currently use WhatsApp, so there is no email delivery credential to configure.

## Running the project

Run these commands from the repository root.

### Development

```sh
npm run dev
```

This starts the Vite development server. Use the local URL printed in the terminal.

### Production build and preview

```sh
npm run build
npm run preview
```

`npm run build` creates the production build using the configured Vite/TanStack Start and Nitro setup. `npm run preview` serves the built output locally for preview. Deploy the generated output using a deployment target compatible with the configured Nitro output; no deployment-specific command or platform configuration is defined in this repository.

### Other scripts

```sh
npm run build:dev  # Build using Vite's development mode
npm run lint       # Run ESLint
npm run format     # Format files with Prettier (writes changes)
npm run test       # Run Vitest once
npm run test:watch # Run Vitest in watch mode
```

## Routes and API

### Website routes

| Path | Page |
| --- | --- |
| `/` | Home page and compact supply catalogue |
| `/about` | Company overview |
| `/services` | Service listing |
| `/services/:slug` | Service detail for a known service slug |
| `/supply-range` | Searchable and filterable supply catalogue |
| `/contact` | Contact information and contact call to action |
| `/request-vessel-quote` | Multi-step vessel quote request |

### API

There are no application API endpoints or server functions defined in the current source. The request form is handled in the browser and constructs a WhatsApp link (`wa.me`) containing the entered request details. Completing the form does not submit data to a project backend or save it to a database; the user must send the prepared message in WhatsApp.

Example format of the generated destination (values are URL-encoded by the application):

```text
https://wa.me/254722161095?text=<encoded-vessel-request>
```

## Database

The project has no database dependency, database configuration, migrations, or seed scripts. The service and supply catalogue content is stored as TypeScript data in `src/data/`.

## Usage

- Use the main navigation to browse company information, services, and supply categories.
- On the Supply Range page, filter by category or search for an item. Select **Request** beside a matching item to open the vessel request form.
- On the vessel request page, complete the five steps. Vessel name, vessel type, port, ETA, at least one requirement, contact name, phone, and a valid email are required. Review the summary, then choose **Send via WhatsApp** and send the message in WhatsApp.
- The phone and WhatsApp contact details are maintained in `src/data/company.ts`; catalogue and service descriptions are maintained in `src/data/supply.ts` and `src/data/services.ts`.

## Testing and troubleshooting

The current test suite contains routing smoke tests for the home page and not-found route.

```sh
npm run test
```

Common setup issues:

- **Node version errors:** Check `node --version`; use Node.js 22.12.0 or later.
- **Dependency or lockfile mismatch:** Use one package manager consistently. For npm, run `npm ci` against `package-lock.json`; for Bun, use `bun install` against `bun.lock`.
- **Port already in use:** Vite may select another available port or report that the configured port is occupied. Stop the other process or use the URL printed by Vite.
- **Request is not delivered:** The form prepares a WhatsApp message but does not transmit it automatically. Open WhatsApp from the final form step and send the prepared message.

## Contributing and license

No contribution guidelines or license file are currently present in the repository. Before proposing changes, review the route conventions in `src/routes/README.md` and the project-specific instructions in `AGENTS.md`. The generated route tree should not be edited manually.
