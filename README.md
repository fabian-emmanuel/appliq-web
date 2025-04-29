# AppliQ

A modern React + TypeScript frontend application built with Vite and enhanced with UI components from Radix UI.

## Tech Stack

- **Frontend**: React 18.2.0 with TypeScript 5.2.2
- **Build Tool**: Vite 6.2.6
- **UI Components**: Radix UI component library
- **Styling**: TailwindCSS 4.1.4 with animations
- **Package Manager**: Bun

## Prerequisites

Before starting, make sure you have Bun installed:

### Installing Bun

**For Linux/macOS:**

```bash 
  curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash
   ```


**For Windows:**

```bash 
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```


## Quick Start

### Local Development

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server:

   ```bash
   bun run dev
   ```

   The application will be available at http://localhost:5173

### Using Docker

You can also run the application using Docker:

bash docker compose up


The application will be available at http://localhost:5173

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run lint` - Run ESLint to check for code issues
- `bun run preview` - Preview the production build locally

## Docker Build

The project includes a Dockerfile for production builds:

1. Build the Docker image:
   ```bash
   docker build -t appliq-frontend .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 appliq-frontend
   ```

   The application will be available at http://localhost:8080

## Project Structure

The application follows standard React project structure with Vite:

- `/src` - Application source code
- `/public` - Static assets
- `/dist` - Production build output (generated after build)

## Environment Variables

The application supports the following environment variables:

- `NODE_ENV` - Application environment (development/production)
- `VITE_API_BASE_URL` - API base URL for backend communication

## Features

- **Modern UI Components** - Built with Radix UI primitives
- **Responsive Design** - Using TailwindCSS
- **Theme Support** - Light and dark mode with next-themes
- **Form Handling** - Using react-hook-form
- **Routing** - Using react-router-dom
- **Data Visualization** - Using recharts
- **Toast Notifications** - Using sonner
- **Carousel** - Using embla-carousel-react
- **Animations** - Using tailwindcss-animate
- **Command Menu** - Using cmdk
- **OTP Input** - Using input-otp
- **Error Handling** - Using react-error-boundary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.