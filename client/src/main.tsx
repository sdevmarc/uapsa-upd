import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes'
import { ThemeProvider } from './hooks/useTheme'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"
import { API_FIND_SYSTEM_UI } from './api'
import logo_placeholder from '@/assets/logo.png'

const queryClient = new QueryClient()

const App = () => {
    const { data: systemui, isFetched: systemuiFetched } = useQuery({
        queryFn: () => API_FIND_SYSTEM_UI(),
        queryKey: ['systemui']
    })

    useEffect(() => {
        const changeFavicon = (url: string) => {
            const link = document.querySelector("link[rel~='icon']")
            if (!link) {
                const newLink = document.createElement('link')
                newLink.rel = 'icon'
                newLink.href = url
                document.getElementsByTagName('head')[0].appendChild(newLink)
            } else {
                (link as HTMLLinkElement).href = url
            }
        }
        if (systemuiFetched && systemui) {
            const logo = systemui.data?.header_icon?.header_icon_url
            const title = systemui.data?.header_title;
     
            changeFavicon(logo || logo_placeholder)
            document.title = title || 'UAPSA-UPD';
        }

    }, [systemuiFetched, systemui]);

    return (
        <>
            <RouterProvider router={Routes} />
            <Toaster />
        </>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
