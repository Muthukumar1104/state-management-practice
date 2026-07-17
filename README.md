# React State Management Practice

A basic React application created to practice and compare different state-management approaches using the same Authentication and User CRUD functionality.

## Tech Stack

* React.js
* TypeScript
* Vite
* pnpm
* Tailwind CSS
* Bootstrap
* React Router DOM
* React Toastify
* MSW (Mock Service Worker)
* LocalStorage for mock data persistence

The same base application can later be implemented using:

* Context API
* Redux Toolkit
* Redux Toolkit + RTK Query
* Zustand
* TanStack Query
* Zustand + TanStack Query

---

## 1. Create Vite Project

```bash
pnpm create vite@latest state-management-practice --template react-ts
```

Move into the project:

```bash
cd state-management-practice
```

Install the default dependencies:

```bash
pnpm install
```

---

## 2. Install React Router DOM

```bash
pnpm add react-router-dom
```

---

## 3. Install Tailwind CSS

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

Configure Tailwind CSS in `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Add Tailwind CSS to `src/index.css`:

```css
@import "tailwindcss";
```

---

## 4. Install Bootstrap

```bash
pnpm add bootstrap
```

Import Bootstrap in `src/main.tsx`:

```ts
import "bootstrap/dist/css/bootstrap.min.css";
```

---

## 5. Install React Toastify

```bash
pnpm add react-toastify
```

Import the React Toastify CSS:

```ts
import "react-toastify/dist/ReactToastify.css";
```

Add `ToastContainer` to the application:

```tsx
import { ToastContainer } from "react-toastify";

<ToastContainer
  position="bottom-center"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
/>
```

---

## 6. Install MSW

Install Mock Service Worker:

```bash
pnpm add -D msw
```

Generate the MSW service worker file:

```bash
pnpm exec msw init public/ --save
```

This creates:

```text
public/
└── mockServiceWorker.js
```

---

## 7. Configure MSW

Create the following mock files:

```text
src/
└── mocks/
    ├── browser.ts
    ├── handlers.ts
    └── mockData.ts
```

Initialize MSW in `src/main.tsx`:

```ts
const enableMSW =
  import.meta.env.DEV ||
  import.meta.env.VITE_ENABLE_MSW === "true";

if (enableMSW) {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}
```

---

## 8. Configure Path Alias

The project uses the `@/` alias for imports.

Example:

```ts
import { UserProvider } from "@/context/UserContext";
```

Update `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Install Node.js type definitions if required:

```bash
pnpm add -D @types/node
```

Update the TypeScript configuration:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 9. Environment Configuration

Create a `.env` file if you want to manually control MSW:

```env
VITE_ENABLE_MSW=true
```

MSW will automatically run in development mode because of:

```ts
import.meta.env.DEV
```

The environment variable allows MSW to be enabled manually in other environments when needed.

---

## 10. Mock Data Persistence

MSW mock data normally resets whenever the browser is refreshed because the data exists only in memory.

To persist Create, Update, and Delete operations, this project stores mock users in `localStorage`.

The flow is:

```text
Initial Mock Data
       ↓
localStorage
       ↓
MSW API
       ↓
React Application
       ↓
Create / Update / Delete
       ↓
MSW Handler
       ↓
Update localStorage
       ↓
Browser Refresh
       ↓
Updated Data Remains
```

To reset the mock data, remove the stored data from browser localStorage.

Example:

```js
localStorage.removeItem("mock_users");
```

Then refresh the application.

---

## 11. Authentication

The application contains a basic mock authentication flow.

Login credentials:

```text
Email: admin@example.com
Password: admin123
```

Authentication flow:

```text
Login Page
    ↓
POST /api/auth/login
    ↓
MSW Handler
    ↓
Validate Credentials
    ↓
Return Mock Token
    ↓
Store Token
    ↓
Protected Route
    ↓
Dashboard
```

---

## 12. Mock API Endpoints

Authentication:

```text
POST /api/auth/login
```

User CRUD:

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## 13. Run the Application

Start the development server:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Run ESLint:

```bash
pnpm lint
```

---

## Project Purpose

The purpose of this project is to use the same UI, Authentication, CRUD operations, API endpoints, and MSW mock backend while changing only the state-management implementation.

Recommended learning order:

```text
Base Setup
    ↓
Context API
    ↓
Redux Toolkit
    ↓
Redux Toolkit + RTK Query
    ↓
Zustand
    ↓
TanStack Query
    ↓
Zustand + TanStack Query
```

This makes it easier to understand the differences between client state management and server state management without rebuilding the entire application for every library.
