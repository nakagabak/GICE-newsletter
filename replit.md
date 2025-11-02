# GICE Email Template Builder

## Overview

The GICE Email Template Builder is a web application designed for the Global, International, and Comparative Education (GICE) program at Harvard Graduate School of Education. It provides a visual, drag-and-drop interface for creating professional email newsletters with Harvard-branded styling. The application allows users to compose emails using pre-designed content blocks (headers, text, events, announcements, media, footers), edit them in real-time, save templates to a database, and export them as production-ready HTML for email campaigns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component System**
- shadcn/ui component library built on Radix UI primitives (New York style variant)
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode builder interface with light mode email previews
- Split-screen layout: left sidebar (component library), center canvas (600px email preview), right panel (properties editor - collapsible)

**State Management**
- TanStack Query (React Query) for server state management and API caching
- Local React state for UI interactions and draft email composition
- Custom hooks for form handling and mobile responsiveness

**Key Design Patterns**
- Component composition with block-based email builder
- Controlled components for real-time inline editing (contentEditable)
- Email-safe HTML table layouts for cross-client compatibility
- Separation of builder UI (modern web components) from email template rendering (email-safe HTML)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- ESM module system throughout the codebase
- Custom middleware for request logging and error handling

**API Design**
- RESTful endpoints for CRUD operations on email templates
- Object storage endpoints for image uploads
- JSON-based request/response format with Zod schema validation

**Development Environment**
- Vite middleware integration for development with HMR
- Separate build outputs: client to `dist/public`, server to `dist`
- Environment-based configuration (NODE_ENV)

### Data Storage Solutions

**Database**
- PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries and migrations
- Schema defined in shared directory for client-server type consistency

**Database Schema**
- `users` table: Basic authentication (id, username, password)
- `email_templates` table: Stores template metadata and block structure
  - `blocks` field: JSONB array containing typed email block components
  - Timestamps for creation and updates
  - UUID primary keys

**Data Model Philosophy**
- Email content stored as structured JSON blocks rather than raw HTML
- Each block has a type (header, text, event, announcement, divider, media, footer) and content object
- Enables flexible editing and rendering while maintaining data integrity

### External Dependencies

**File Storage**
- Google Cloud Storage integration via `@google-cloud/storage`
- Replit Object Storage for development with sidecar authentication
- Uppy file upload library with AWS S3 adapter for client-side uploads
- Upload flow: client requests signed URL → uploads directly to storage → normalizes path for database storage

**UI Component Libraries**
- Radix UI for accessible, unstyled component primitives (dialogs, dropdowns, tooltips, etc.)
- Uppy Dashboard for file upload UI
- Lucide React for consistent iconography

**Form Handling & Validation**
- React Hook Form for form state management
- Zod for runtime type validation and schema generation
- `@hookform/resolvers` for Zod integration with React Hook Form

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- tsx for running TypeScript directly in development
- esbuild for production server bundling

**Email-Safe Rendering**
- Custom HTML table layouts for maximum email client compatibility
- Inline styles (no external CSS) for email content
- Email-safe fonts: Georgia (serif headings), Arial/Helvetica (body text)
- Harvard Crimson brand color (#A51C30) for accents and borders

**Email Integration**
- User dismissed Resend integration setup
- Email sending functionality requires manual setup with user-provided credentials
- Awaiting user decision on which email service to use (Resend, SendGrid, Gmail, Outlook, or custom SMTP)