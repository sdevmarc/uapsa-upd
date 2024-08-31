import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'
import { ThemeProvider } from './hooks/useTheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={Routes} />
                <Toaster />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
