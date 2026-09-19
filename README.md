# Brainly UI

A modern, responsive content management and sharing platform built with React, TypeScript, and Tailwind CSS. Organize, discover, and share curated content seamlessly.

## Features

- **Content Management** - Create, organize, and delete your personal content library with support for multiple content types
- **Search & Discovery** - Search through content and explore what others are sharing
- **User Authentication** - Secure sign up and sign in with token-based authentication
- **Responsive Design** - Beautiful UI that works across all devices with Tailwind CSS
- **Real-time Content Updates** - Instant feedback when adding or removing content
- **Social Integration** - Built-in support for embedding social media content (Twitter, YouTube)

## Tech Stack

- **Frontend Framework** - React 19 with TypeScript
- **Styling** - Tailwind CSS with animated components
- **Routing** - React Router v7
- **UI Components** - Radix UI primitives (dialog, labels, toast notifications)
- **HTTP Client** - Axios for API communication
- **Build Tool** - Vite with React plugin
- **Linting** - ESLint with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd brainly-ui

# Install dependencies
npm install

# Set up environment configuration
# Update src/config.ts with your backend URL
```

### Development

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

### Linting

```bash
# Run ESLint to check code quality
npm lint
```

## Project Structure

The application follows a component-based architecture with clear separation of concerns:

- **Pages** - Main route views (Dashboard, Signin, Signup, UserSearch)
- **Components** - Reusable UI components and custom shadcn/ui components
- **Hooks** - Custom React hooks for content management and search
- **Icons** - SVG icon components
- **Utils** - API utilities and helper functions
- **Config** - Application configuration and constants

## Authentication

The app uses token-based authentication stored in localStorage. Protected routes require a valid token to access dashboard and search features.

