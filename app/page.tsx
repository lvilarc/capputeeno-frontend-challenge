"use client"


import { QueryClient, QueryClientProvider } from '@tanstack/react-query'




import { FilterBar } from "@/components/filter-bar";
import styles from "./page.module.css";



import { ProductsList } from "@/components/products.list";
import { PaginationBar } from '@/components/pagination-bar';


export default function Home() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <FilterBar/>
        <PaginationBar/>
        <ProductsList/>
      </main>
    </QueryClientProvider>
  )
}
