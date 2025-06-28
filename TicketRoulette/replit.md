# Seu Ingresso 🎟️ - Sistema de Sorteio de Ingressos

## Overview

This is a full-stack web application built for ticket distribution through a random lottery system. The application allows users to participate in a ticket draw and receive access to different types of tickets via Google Drive links. It features a modern, animated UI with confetti effects and real-time statistics tracking.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with JSON responses

### UI/UX Design System
- **Component Library**: Radix UI primitives with custom styling
- **Theme**: shadcn/ui "new-york" style with neutral color palette
- **Typography**: Inter font family
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA-compliant components from Radix UI

## Key Components

### Core Application Flow
1. **Selection Screen**: Users can view available ticket types and initiate the draw
2. **Loading Screen**: Animated loading with progress indicator and spinning ticket icon
3. **Result Screen**: Displays the drawn ticket with celebration effects and sharing options

### Database Schema
- **Users Table**: Basic user management (currently minimal implementation)
- **Ticket Draws Table**: Records all ticket draws with metadata including:
  - Ticket type drawn
  - Timestamp
  - User agent information
  - IP address for analytics

### API Endpoints
- `GET /api/stats`: Returns statistics including total draws, counts by ticket type, and simulated online users
- `POST /api/draw`: Records a new ticket draw and returns the result

### Ticket Types
- **VIP**: Premium access with crown icon
- **Premium**: Special area access with star icon
- **Pista**: General admission with music note icon
- **Convidado**: Special guest access with party icon

Each ticket type includes:
- Google Drive link for ticket access
- Custom styling with gradients and colors
- Weighted probability distribution (configurable in `getRandomTicket()`)

## Data Flow

### Ticket Draw Process
1. User clicks "Sortear Meu Ingresso" button
2. Frontend generates random ticket selection using weighted probabilities
3. Loading screen displays with progress animation
4. API call records the draw in database with user metadata
5. Result screen shows with confetti animation and ticket details
6. User can access ticket via Google Drive link or try again

### Statistics Tracking
1. Real-time statistics fetched every 30 seconds
2. Total draw count includes base offset for visual appeal
3. Breakdown by ticket type for analytics
4. Simulated online user count for engagement

### State Management
- Local component state for UI flow (selection → loading → result)
- React Query for server state caching and synchronization
- Form state managed by React Hook Form where applicable

## External Dependencies

### Database Integration
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **Connection Pooling**: Built-in with Neon's serverless architecture

### Third-Party Services
- **Google Drive**: Ticket storage and distribution platform
- **Google Fonts**: Inter font family loading
- **Replit Integration**: Development environment with hot reloading

### Key Libraries
- **Motion**: Framer Motion for animations
- **Validation**: Zod for runtime type checking
- **Date Handling**: date-fns for date manipulation
- **Utilities**: clsx and tailwind-merge for conditional styling

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite development server with HMR
- **Development Tools**: Replit integration with error overlay
- **Type Checking**: TypeScript strict mode with comprehensive path mapping

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Asset Optimization**: Automatic CSS/JS minification and tree-shaking
- **Environment Variables**: Database URL and other config via environment

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Development**: `npm run db:push` for schema updates
- **Schema Location**: Shared schema definition in `/shared/schema.ts`

### Build Commands
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm start`: Production server startup
- `npm run check`: TypeScript type checking

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.