import { ICategory, ITag } from '@/types'
import { useState } from 'react'
import EditCategoryCard from './EditCategoryCard'
import { Tag } from '../Resources/Tag'
import { H2 } from '../Text/Headings'

type TCategoryCard = {
    category: ICategory
    allTags: ITag[]
}
export default function CategoryCard({ category, allTags }: TCategoryCard) {
    const [edit, setEdit] = useState(false)

    return (
        <div
            style={{ border: '4px solid ' + category.color }}
            className="min-h-96 w-72 rounded-lg bg-white p-2"
        >
            {edit ? (
                <EditCategoryCard
                    category={category}
                    allTags={allTags}
                    onEditClose={() => setEdit(false)}
                />
            ) : (
                <div>
                    <H2 title={category.name}></H2>
                    <div className="my-4 flex items-center gap-4">
                        <strong>Color: </strong>
                        <div
                            style={{ background: category.color }}
                            className="h-8 w-8 rounded-full"
                        >
                            {' '}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {category.tags?.map((t) => {
                            return (
                                <Tag
                                    title={t.name}
                                    color={category.color}
                                    key={t.name}
                                />
                            )
                        })}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEdit(true)}
                            style={{ background: category.color }}
                            className="mt-2 w-full rounded-lg px-4 py-2 text-white"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
