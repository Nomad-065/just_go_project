# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

---

## ✨ Features

- **Fast development** with Vite
- **State management** using Zustand
- **Server state & caching** via TanStack React Query
- Product search with URL sync
- Product categories & category-based browsing
-  Infinite scrolling pagination
- Global currency provider (USD / EUR / GBP)
- Theme mode support
- Tailwind CSS + MUI base components
- Custom in-house Table Component
- Fully typed with TypeScript
- ESLint configured for React + Hooks + Fast Refresh

---

## 🛠️ Tech Stack

| Category | Tech                       |
|--------|----------------------------|
| Framework | React 19                   |
| Language | TypeScript                 |
| Build Tool | Vite                       |
| Routing | React Router v7            |
| Server State | @tanstack/react-query      |
| Client State | Zustand                    |
| Styling | Tailwind CSS(v4) + MUI     |
| HTTP Client | Axios                      |
| Icons | Lucide + MUI Icons         |
| Linting | ESLint + TypeScript ESLint |

---

## 📁 Project Structure

```txt
src/
├── components/        # Reusable UI components
├── hooks/             # Custom hooks (React Query, Toast, Currency, etc.)
├── models/            # TypeScript models (Product, Category, etc.)
├── pages/             # Route pages
├── providers/         # Context providers (Theme, Currency)
├── services/          # API service layer
├── stores/            # Zustand stores
├── utils/             # Utility helpers
├── App.tsx            # App routes
├── main.tsx           # App bootstrap


---
```
---

## ⚙️ First-Time Setup

Follow these steps to set up the project for the first time.

### 1) Clone the repository

```bash
git clone https://github.com/Nomad-065/just_go_project.git
cd product-webapp

npm install
```
### 2) Create or cross-check the .env file
Make sure the .env file exists at the root of the project and include these variables

```bash
VITE_API_BASE_URL=https://dummyjson.com
VITE_API_ENV=development
```

### 3) All set to run
Once all is ready, use

```bash
npm run dev
```


## ❓ Q & A

**Q: What trade-offs did you consciously make due to time constraints?**  
A: Having a dropdown /select field would've made for a better UX instead of having a button act as a toggle, and resizable columns for the Table. The color palette also needed a bit more curating. These and some others are nice to haves were cut due to time constraints.

**Q: If this app needed to scale (more data, more features), what would you refactor first?**  
A: I would work on adding a debouncer for the components that handles anything related to API calls, aside from some minor tweaks the overall structure /components are ready to scale up.

**Q: Did you use AI tools? If yes, which parts and how did you verify correctness?**  
A: Yes, I used it mainly to generate placeholder pages or functions and dummy data while I developed the UI/UX. Aside from that I used it as a reference for syntax, so the correctness was verified as I overwrote the generated code or only copied snippets of code lines(not code blocks)