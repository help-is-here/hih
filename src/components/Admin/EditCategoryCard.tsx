import { ICategory, ITag } from '@/types'
import { useMutation, useQueryClient } from 'react-query'
import { useEffect, useState } from 'react'
import TagUpdater from '../Form/TagUpdater'
import { deleteCategory, updateCategory } from '@/api/api'
import { FaTrash } from 'react-icons/fa'

type TCategoryCard = {
    category: ICategory
    allTags: ITag[]
    onEditClose: () => void
}
export default function CategoryCard({
    category,
    allTags,
    onEditClose,
}: TCategoryCard) {
    const [updatedTags, setUpdatedTags] = useState<ITag[]>([])
    const [title, setTitle] = useState('')
    const [color, setColor] = useState('')
    const queryClient = useQueryClient()
    const saveCategoryMut = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onEditClose()
        },
    })
    const deleteMut = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            onEditClose()
        },
    })
    useEffect(() => {
        setTitle(category.name)
        setColor(category.color)
    }, [category.name, category.color])
    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <strong>Title:</strong>
                <input
                    className="w-full rounded-full border border-solid border-gray-600 px-4 py-2 text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    title={
                        category.tags !== undefined && category.tags?.length > 0
                            ? 'All tags must be unlinked to delete.'
                            : 'Delete category'
                    }
                    disabled={
                        category.tags !== undefined && category.tags?.length > 0
                    }
                    onClick={() => deleteMut.mutate(category)}
                >
                    <FaTrash
                        className={`${
                            category.tags !== undefined &&
                            category.tags?.length > 0
                                ? 'text-gray-300'
                                : 'text-black'
                        }`}
                    />
                </button>
            </div>
            <div className="my-4 flex items-center gap-4">
                <strong>Color: </strong>
                <input
                    type="color"
                    value={color}
                    className="h-8 w-8 rounded-full"
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <TagUpdater
                notAllowed={allTags.filter(
                    (t) => t.tag_category && t.tag_category.id !== category.id
                )}
                categoryId={category.id}
                initTags={category.tags ? category.tags : []}
                onSet={(newTags) => setUpdatedTags(newTags)}
            />
            <div className="flex gap-2">
                <button
                    onClick={() =>
                        saveCategoryMut.mutate({
                            ...category,
                            name: title,
                            tags: updatedTags,
                            color: color,
                        })
                    }
                    style={{ background: color }}
                    className="mt-2 w-full rounded-lg px-4 py-2 text-white"
                >
                    Save
                </button>
                <button
                    onClick={onEditClose}
                    className="mt-2 w-full rounded-lg bg-orange-800 px-4 py-2 text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
