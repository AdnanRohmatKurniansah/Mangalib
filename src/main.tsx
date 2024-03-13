import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Comic from './pages/Comic.tsx'
import NotFound from './NotFound.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ListChapter from './pages/ListChapter.tsx'
import SearchComic from './pages/SearchComic.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/comic/manga/:slug',
    element: <Comic />
  },
  {
    path: '/comic/ch/:slug',
    element: <ListChapter />
  },
  {
    path: '/comic/search/:keyword',
    element: <SearchComic />
  },
  {
    path: '*',
    element: <NotFound />
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} /> 
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
