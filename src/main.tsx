import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeModeProvider} from "./providers/ThemeModeProvider.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ThemeModeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
