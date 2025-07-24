# DevSync

DevSync is a real-time collaborative coding platform designed for teams, educators, and students to code, learn, and build together. It features live code editing, project management, DSA (Data Structures & Algorithms) practice, and a powerful web development environment.

## Features

- **Live Collaboration:** Code in real-time with teammates, students, or mentors with cursor tracking and instant updates.
- **Web Development Environment:** Integrated HTML, CSS, and JavaScript editor with instant preview and responsive design testing.
- **Project Management:** Create, edit, and manage coding projects with versioning and ownership.
- **Authentication:** Secure sign-in and user management powered by Clerk.
- **Modern UI:**  accessible, and visually appealing interface using Tailwind CSS and Radix UI.

## Tech Stack

### Frontend
- **React 18**
- **Vite** (build tool)
- **Redux Toolkit** (state management)
- **Clerk** (authentication)
- **Liveblocks** (real-time collaboration)
- **CodeMirror 6** (code editor)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Radix UI** (UI components)
- **Yjs** (CRDT for collaborative editing)

### Backend
- **Node.js** with **Express**
- **TypeScript**
- **Mongoose** (MongoDB ODM)
- **Liveblocks Node SDK**
- **Clerk Express** (authentication middleware)
- **CORS**, **dotenv**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended for monorepo)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- Clerk and Liveblocks API keys (for authentication and real-time features)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd DevSync
```

### 2. Install Dependencies

#### Using pnpm (recommended)

```bash
# Install dependencies for both backend and frontend
cd back
pnpm install
cd ../front
pnpm install
```

---

### 3. Environment Variables

#### Backend (`back/.env`)

Create a `.env` file in the `back` directory with the following:

```
MONGODB_URI=<your-mongodb-uri>
CLERK_SECRET_KEY=<your-clerk-secret-key>
LIVEBLOCKS_SECRET_KEY=<your-liveblocks-secret-key>
PORT=5000
```

#### Frontend (`front/.env` or `front/.env.local`)

Create a `.env` file in the `front` directory with:

```
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_LIVEBLOCKS_PUBLIC_KEY=<your-liveblocks-public-key>
VITE_API_URL=http://localhost:5000
```

---

### 4. Running the Development Servers

#### Backend

```bash
cd back
pnpm dev
```

#### Frontend

```bash
cd front
pnpm dev
```

- The frontend will typically run on [http://localhost:5173](http://localhost:5173)
- The backend will run on [http://localhost:5000](http://localhost:5000)

---

## Usage

- Visit the frontend URL in your browser.
- Sign up or sign in using Clerk authentication.
- Create or join a live coding room.
- Use the project dashboard to manage your projects.
- Practice DSA problems or collaborate on web development projects in real-time.

---

## Scripts

### Backend (`back/package.json`)

- `pnpm dev` – Start backend in development mode (with hot reload)
- `pnpm build` – Compile TypeScript
- `pnpm start` – Run compiled server

### Frontend (`front/package.json`)

- `pnpm dev` – Start frontend in development mode
- `pnpm build` – Build for production
- `pnpm preview` – Preview production build
- `pnpm lint` – Lint code

---

## Folder Structure

```
DevSync/
  back/      # Backend (Express, MongoDB, TypeScript)
  front/     # Frontend (React, Vite, Tailwind CSS)
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[ISC](LICENSE)

---

## Acknowledgements

- [Clerk](https://clerk.dev/) for authentication
- [Liveblocks](https://liveblocks.io/) for real-time collaboration
- [CodeMirror](https://codemirror.net/) for the code editor
- [Radix UI](https://www.radix-ui.com/) and [Tailwind CSS](https://tailwindcss.com/) for UI

---

Feel free to further customize this README to match your project's branding or add more details as your project evolves!
