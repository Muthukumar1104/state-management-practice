# Zustand Notes

Zustand is a lightweight state management library for React. It allows multiple components to access and update shared state without prop drilling or wrapping the application with multiple Context providers.

## Installation

```bash
pnpm add zustand
```

---

## 1. Basic Zustand Store

A Zustand store contains:

- **State** – the data
- **Actions** – functions that update the data

```ts
import { create } from "zustand";

interface CounterState {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));
```

Basic flow:

```text
Component
    ↓
Calls Action
    ↓
Zustand Store
    ↓
set() updates state
    ↓
Component re-renders
```

---

## 2. `create()`, `set()` and `get()`

### `create()`

Creates the Zustand store.

```ts
create((set, get) => ({
  // state
  // actions
}));
```

### `set()`

Updates the store state.

```ts
set({
  loading: true,
});
```

When the new value depends on the current state:

```ts
set((state) => ({
  count: state.count + 1,
}));
```

### `get()`

Reads the latest state inside the store.

```ts
const count = get().count;
```

Remember:

```text
create() → Create store
set()    → Update state
get()    → Read current state
```

---

## 3. Using Store State in Components

Use a selector to access only the required state.

```tsx
const count = useCounterStore(
  (state) => state.count
);
```

Access an action:

```tsx
const increment = useCounterStore(
  (state) => state.increment
);
```

Use it:

```tsx
<button onClick={increment}>
  Increment
</button>
```

Components subscribed to changed state automatically re-render.

---

## 4. Authentication with Zustand

Authentication state can be managed in a separate store.

```text
Auth Store
├── user
├── token
├── isAuthenticated
├── loading
├── error
├── login()
└── logout()
```

Login flow:

```text
Login Page
    ↓
login(credentials)
    ↓
Auth Store
    ↓
Auth Service
    ↓
API / MSW
    ↓
Store user and token
    ↓
Update authentication state
```

This removes authentication state management from individual components.

---

## 5. Protected Routes with Zustand

Protected routes can read authentication state directly from the store.

```tsx
const isAuthenticated = useAuthStore(
  (state) => state.isAuthenticated
);
```

Flow:

```text
Protected Route
      ↓
isAuthenticated?
   ↙        ↘
 true      false
  ↓          ↓
Outlet    Login Page
```

---

## 6. CRUD with Zustand

A user store can manage CRUD-related state and actions.

```text
User Store
├── users
├── selectedUser
├── loading
├── error
├── fetchUsers()
├── addUser()
├── updateUser()
└── deleteUser()
```

Architecture:

```text
Component
    ↓
Zustand Store
    ↓
Service
    ↓
API / MSW
```

The component mainly handles the UI, while the store manages state and actions.

---

## 7. Async API Calls

Zustand actions can be asynchronous.

```ts
fetchUsers: async () => {
  const users = await getUsers();

  set({
    users,
  });
};
```

Flow:

```text
Component
    ↓
fetchUsers()
    ↓
Zustand Action
    ↓
Service
    ↓
API / MSW
    ↓
Response
    ↓
set({ users })
    ↓
UI updates
```

Zustand manages the state. The service layer handles the actual API request.

---

## 8. Loading and Error Handling

For asynchronous operations, the common pattern is:

```ts
set({
  loading: true,
  error: null,
});

try {
  // API call
  // Update successful data
} catch (error) {
  // Update error state
} finally {
  set({
    loading: false,
  });
}
```

Flow:

```text
API starts
    ↓
loading = true
    ↓
Success / Error
    ↓
Update state
    ↓
loading = false
```

---

## 9. Persist Middleware

Zustand state normally resets after a browser refresh.

The `persist` middleware can save selected state to storage.

```ts
import { persist } from "zustand/middleware";

create(
  persist(
    (set) => ({
      // state
      // actions
    }),
    {
      name: "auth-storage",
    }
  )
);
```

Useful data to persist:

```text
✓ Authentication
✓ User preferences
✓ Theme
✓ Cart
```

Usually avoid persisting temporary state:

```text
✗ Loading
✗ Errors
✗ Modal state
```

---

## 10. Selectors and Performance

Avoid selecting the entire store when only one value is needed.

Instead of:

```tsx
const store = useUserStore();
```

Prefer:

```tsx
const users = useUserStore(
  (state) => state.users
);
```

This helps components subscribe only to the state they need.

For selecting multiple values, Zustand also provides `useShallow`.

---

## 11. Immer with Zustand

Immer is useful for updating complex or deeply nested state.

Without Immer:

```ts
set((state) => ({
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Muthu",
    },
  },
}));
```

With Immer:

```ts
set((state) => {
  state.user.profile.name = "Muthu";
});
```

Immer allows mutation-style code while internally keeping state updates immutable.

### When to use Immer

Use it for complex nested state:

```text
Company
└── Departments
    └── Teams
        └── Employees
```

For simple updates, Immer is usually unnecessary:

```ts
set({
  loading: true,
});
```

Learn normal Zustand first, then use Immer when state updates become complex.

---

## Zustand vs TanStack Query

Zustand is mainly used for **client/global state**.

```text
Authentication
UI state
Theme
User preferences
Cart
```

TanStack Query is mainly designed for **server/API state**.

```text
API data
Caching
Refetching
Synchronization
Server data updates
```

For learning, CRUD can first be implemented completely with Zustand.

A common real-world combination is:

```text
Zustand
    ↓
Client / Global State

TanStack Query
    ↓
Server / API State
```

Similarly:

```text
Redux Toolkit + RTK Query
```

can be compared with:

```text
Zustand + TanStack Query
```

---

## Quick Reference

| Concept | Purpose |
|---|---|
| `create()` | Creates the Zustand store |
| `set()` | Updates state |
| `get()` | Reads current state inside the store |
| Selector | Reads only required state |
| Action | Function that changes state |
| Async Action | Handles asynchronous operations |
| `persist` | Saves state across browser refresh |
| `useShallow` | Helps optimize multiple selections |
| Immer | Simplifies complex nested state updates |

## Learning Order

```text
1. Basic Zustand Store
        ↓
2. create(), set(), get()
        ↓
3. State and Actions in Components
        ↓
4. Authentication
        ↓
5. Protected Routes
        ↓
6. User CRUD
        ↓
7. Async API Calls
        ↓
8. Loading and Error Handling
        ↓
9. Persist Middleware
        ↓
10. Selectors and Performance
        ↓
11. Immer
```