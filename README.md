# Real-Time Collaborative Drawing

A modern collaborative drawing platform built with Next.js and WebSocket technology.

## Features

- 🎨 Real-time drawing collaboration
- 🔄 Live canvas synchronization
- 🛠️ Drawing tools:
  - Rectangle
  - Circle
  - Line
  - Freehand drawing
- 🖐️ Canvas controls:
  - Pan
  - Zoom
  - Reset view
- 🔐 Secure authentication
- 🏠 Drawing rooms
- 🌙 Dark theme

## Technology Stack

- **Frontend**

  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Custom UI components
  - Canvas API

- **Backend**

  - Node.js
  - WebSocket server
  - Prisma ORM
  - PostgreSQL database

- **Development**
  - Turborepo
  - pnpm package manager
  - Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm package manager
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:

```bash
pnpm install
```

3. Configure environment variables:

```env
# apps/web/.env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1

# apps/http-backend/.env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key

# apps/ws-backend/.env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

4. Set up the database:

```bash
cd apps/http-backend
pnpm prisma generate
pnpm prisma db push
```

5. Start development servers:

```bash
pnpm dev
```

## Project Structure

```
apps/
  ├── web/                 # Next.js frontend
  ├── http-backend/       # REST API server
  └── ws-backend/        # WebSocket server
packages/
  ├── ui/               # Shared components
  ├── db/              # Database client
  └── common/          # Shared utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tool`)
3. Commit changes (`git commit -m 'Add new drawing tool'`)
4. Push to branch (`git push origin feature/new-tool`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details
