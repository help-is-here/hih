import { useQuery } from 'react-query'
import { getCategories, defaultStaleTime, getTags } from '@/api/api'
import LoadingPage from '../States/LoadingPage'
import ErrorPage from '../States/ErrorPage'
import CategoryCard from './CategoryCard'
import { useState } from 'react'
import EditCategoryCard from './EditCategoryCard'

export default function CategoryManager() {
    const [newCategory, setNewCategory] = useState(false)
    const { isLoading, isError, data } = useQuery(
        ['categories'],
        getCategories,
        {
            staleTime: defaultStaleTime,
        }
    )
    const tags = useQuery(['tags'], getTags, {
        staleTime: defaultStaleTime,
    })

    if (isLoading || tags.isLoading) {
        return <LoadingPage />
    }
    if (isError || tags.isError) {
        return <ErrorPage />
    }

    return (
        <div className="min-h-screen">
            {data && data.data && tags && tags.data ? (
                <div className="flex flex-wrap gap-4">
                    {data.data.map((category) => (
                        <CategoryCard
                            key={category.name}
                            category={category}
                            // @ts-expect-error: join types not perpetuated correctly by supabase
                            allTags={tags.data.data ? tags.data.data : []}
                        />
                    ))}
                    {newCategory ? (
                        <div className="min-h-96 w-72 rounded-lg border border-4 border-solid border-black bg-white p-2">
                            <EditCategoryCard
                                category={{
                                    name: '',
                                    color: '#000000',
                                    id: -1,
                                }}
                                // @ts-expect-error: join types not perpetuated correctly by supabase
                                allTags={tags.data.data ? tags.data.data : []}
                                onEditClose={() => setNewCategory(false)}
                            />
                        </div>
                    ) : (
                        <button
                            className="mx-2 rounded-lg bg-orange-950 p-4 text-white"
                            onClick={() => setNewCategory(true)}
                        >
                            Add Category
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex w-full justify-center text-black">
                    No categories found
                </div>
            )}
        </div>
    )
}
