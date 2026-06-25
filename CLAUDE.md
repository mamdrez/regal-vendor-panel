# CLAUDE.md

## Project Overview

Regal is a fashion community platform.

The main idea of Regal is to help users discover fashion products from different brands based on their interests, style, and preferences. Regal also connects buyers to online shops, vendors, or official brand stores that sell those products.

This repository is focused on the frontend of the Regal Vendor Panel.

The Vendor Panel is used by vendors, online shops, and brand owners to manage their activity inside Regal. A vendor can be either:

- A brand owner who sells their own products.
- An online shop or seller that sells products from one or multiple brands.

The project should be developed as a clean, scalable, and maintainable React application.

---

## Tech Stack

Use the following stack:

- React
- Vite
- TypeScript
- React Router DOM
- React Query
- Axios
- CSS Modules

Do not add new major libraries unless the task explicitly asks for it.

Do not use UI frameworks such as Tailwind, MUI, Ant Design, Chakra UI, Bootstrap, or similar libraries unless specifically requested.

---

## Language and Direction

The application UI must be in Persian.

The layout must support RTL.

All user-facing text should be Persian, including:

- Buttons
- Page titles
- Navigation labels
- Forms
- Tables
- Empty states
- Error messages
- Status labels

Code, file names, component names, variables, functions, and types should remain in English.

---

## Project Structure

Use a feature-based structure.

Preferred structure:

```txt
src/
  app/
  routes/
  layouts/
  shared/
  features/
```

Use each folder for the following purpose:

```txt
app/       Application setup, providers, global styles
routes/    Route definitions and route paths
layouts/   Main layouts such as auth layout and vendor panel layout
shared/    Reusable components, hooks, utils, services, and types
features/  Feature-based modules
```

Each feature should keep its own pages, components, hooks, services, and types.

Example:

```txt
features/
  products/
    pages/
    components/
    hooks/
    services/
    types/
```

Do not put feature-specific business components inside `shared`.

Only truly reusable components should be placed in `shared`.

---

## Styling Rules

Use CSS Modules for styling.

Each styled component should have its own CSS module file.

Example:

```txt
Button.tsx
Button.module.css
```

Use readable and meaningful class names.

Keep global CSS limited to:

- CSS variables
- Reset/base styles
- Font setup
- RTL base styles
- Body styles

Avoid writing component-specific styles globally.

---

## React Rules

Use functional components only.

Do not use class components.

Keep components small, focused, and readable.

Avoid large components that contain too much logic, UI, and state in one file.

Separate responsibilities:

- Page components should compose sections and feature components.
- Feature components should handle feature-specific UI.
- Shared components should be reusable and generic.
- API logic should stay inside services.
- Server state should be handled with React Query hooks.

---

## TypeScript Rules

Use TypeScript strictly.

Do not use `any`.

If a type is unknown, define a proper type or use `unknown` with safe narrowing.

Create proper types for:

- Component props
- API responses
- Form values
- Domain models
- Query params
- Mutation payloads

Keep feature-specific types inside the related feature.

Keep reusable types inside `shared/types`.

---

## API and Data Rules

Use Axios for API requests.

Create a shared API client and use it across the project.

Do not call Axios directly inside UI components.

Each feature should have its own service layer for API calls.

React Query should be used for fetching, caching, and mutating server data.

If the backend API is not ready, use mock data through the service layer, not directly inside components.

---

## Component Development Rules

Build components in a reusable and scalable way.

Shared components should be generic and not tied to a specific feature.

Examples of shared components:

```txt
Button
Input
Textarea
Select
Modal
Drawer
Card
Table
Badge
EmptyState
LoadingState
PageHeader
SearchInput
Pagination
```

Feature-specific components should stay inside their own feature.

Examples:

```txt
ProductTable
ProductForm
OrderStatusBadge
InventoryTable
CollectionCard
DiscountForm
```

Components should:

- Have typed props
- Support responsive layouts
- Work correctly in RTL
- Use CSS Modules
- Avoid hardcoded unrelated data
- Handle loading, disabled, and empty states when needed
- Be easy to reuse and maintain

---

## Responsive Design

Responsive design is very important.

Every page and component should work properly on:

- Desktop
- Tablet
- Mobile

Avoid fixed layouts that only work on desktop.

Use flexible layout techniques such as CSS grid and flexbox.

Tables, forms, cards, sidebars, and navigation should all behave properly on smaller screens.

---

## Code Quality Rules

Always prefer clean and maintainable code.

Do not:

- Use `any`
- Use class components
- Mix API logic with UI components
- Create huge files
- Duplicate components unnecessarily
- Add unnecessary dependencies
- Ignore responsive design
- Ignore RTL support
- Put all styles in global CSS
- Implement future phases unless explicitly requested

Always:

- Follow the existing project structure
- Reuse existing components when possible
- Keep code typed
- Keep UI Persian
- Keep code names English
- Keep components modular
- Keep styles scoped with CSS Modules

---

## Working With Future Tasks

This file only defines the general project context and development rules.

Implementation will be requested in separate phases.

When a new task or phase is provided:

1. Read this file first.
2. Understand the current project structure.
3. Implement only what the current phase asks for.
4. Do not jump ahead to future phases.
5. Reuse existing patterns and components.
6. Keep the implementation clean, responsive, typed, and RTL-friendly.



## Design Direction

Regal Vendor Panel should look and feel like a modern, clean, premium SaaS dashboard for a fashion platform.

The UI should be inspired by high-quality productivity and business dashboards, but adapted to a fashion vendor experience.

The design should feel:

* Modern
* Minimal
* Clean
* Premium
* Professional
* Spacious
* UX-friendly
* Fashion-oriented

Use a light dashboard style with:

* White and off-white backgrounds
* Deep black / charcoal text
* Soft gray borders
* Subtle shadows only when needed
* Smooth rounded corners
* Clear spacing
* Clean card layouts
* Calm sidebar
* Strong typography hierarchy
* Simple and readable tables
* Well-grouped forms
* Clear primary actions

Avoid:

* Heavy gradients
* Dark bulky sections
* Too many colors
* Messy spacing
* Heavy shadows
* Generic admin panel feeling
* Over-designed components
* Random decorative elements
* Crowded layouts

The UI should feel refined and usable, not flashy.

---

## UX Principles

Always design pages with clear hierarchy and predictable actions.

Each page should have:

* Clear page title
* Short helpful description when needed
* Main action placed clearly
* Organized content sections
* Proper loading, empty, and error states
* Responsive behavior for desktop, tablet, and mobile

Tables should be readable and not visually heavy.

Forms should be grouped into meaningful sections.

Cards should use subtle borders and clean spacing.

Sidebar navigation should be simple, calm, and easy to scan.

The active sidebar item should be visually clear.

On mobile, layouts should remain usable and should not overflow horizontally.

---

## Visual References

When redesigning or polishing the UI, use the provided dashboard reference screenshots only as inspiration for:

* Layout structure
* Sidebar simplicity
* Spacing
* Clean cards
* Light table design
* Header organization
* Modern SaaS dashboard feeling

Do not copy the references exactly.

Adapt the design language to Regal as a premium fashion vendor platform.

