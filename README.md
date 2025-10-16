# Character Chat App

A modern, real-time character chat application built with Next.js that allows users to interact with AI-powered characters. Users can select from various characters, engage in conversations, and maintain chat history.

## Features

- **Character Selection**: Browse and select from a variety of AI characters
- **Real-time Chat**: Instant messaging with AI characters powered by Groq
- **Chat History**: Persistent conversation history with Supabase
- **User Authentication**: Secure Google OAuth integration
- **Responsive Design**: Mobile-first design with smooth animations
- **Dark/Light Theme**: Theme switching support
- **Metadata**: Metadata generation for SEO

## Technologies Used

- **Next.js**
- **React** 
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Supabase**
- **Framer Motion**
- **Magic UI**
- **Lodash.Debounce**
- **Lucide React**
- **React Icons**

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/myildiz97/character-chat-app.git
cd character-chat-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dfjpiptlxlhrurvrdtuh.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmanBpcHRseGxocnVydnJkdHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNjQ5MjAsImV4cCI6MjA3NTk0MDkyMH0.GCAZhMczT9NE5RDtYS_22LS2aMnLdU8euFHvHTfaAWM
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Groq Configuration
GROQ_API_KEY=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
```

## How to Run Locally

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Project Structure

```
character-chat-app/
├── app/                    # Next.js App Router
│   ├── (app)/             # Route groups
│   │   ├── characters/    # Character selection page
│   │   └── chat/          # Chat interface
│   ├── api/               # API routes
│   │   ├── character/     # Character endpoints
│   │   └── chat/          # Chat endpoints
│   └── auth/              # Authentication routes
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── character/         # Character-related components
│   ├── chat/              # Chat interface components
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── providers/         # Context providers
│   ├── shared/            # Shared components
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── actions/           # Server actions
│   ├── constants/         # Application constants
│   └── types/             # TypeScript type definitions
├── utils/                 # Utility functions
│   └── supabase/          # Supabase client configurations
└── public/                # Static assets
```