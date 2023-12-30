import { useMutation, useQuery, useQueryClient } from 'react-query'
import { defaultStaleTime, deleteTag, getTags } from '@/api/api'
import { FaTag, FaTrash } from 'react-icons/fa'
import { calculateTextColor } from '@/utils/color'

export default function TagManager() {
    const { isLoading, isError, data } = useQuery(['allTags'], getTags, {
        staleTime: defaultStaleTime,
    })
    const queryClient = useQueryClient()
    const deleteMut = useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['allTags'] })
        },
    })
    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <div>Oops, couldn't load tags</div>
    }
    return (
        <div className="my-4 flex flex-wrap gap-2 rounded-lg bg-orange-950 p-4">
            {data && data.data ? (
                data.data.map((t) => {
                    return (
                        <div
                            className="flex items-center rounded-full px-2 py-1"
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            key={t.name}
                            style={{
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                background: t.tag_category
                                    ? // @ts-expect-error: TODO: Fix this
                                      t.tag_category.color
                                    : '#fdba74',
                                color: t.tag_category
                                    ? // @ts-expect-error: TODO: Fix this
                                      calculateTextColor(t.tag_category.color)
                                    : 'black',
                            }}
                        >
                            {t.name}
                            <button
                                // @ts-expect-error: TODO: Fix this
                                onClick={() => deleteMut.mutate(t)}
                                disabled={t.tag_category !== null}
                                title={
                                    t.tag_category !== null
                                        ? 'Must unassign tags from categories before deleting'
                                        : 'Delete tag'
                                }
                            >
                                <FaTrash
                                    className={`${
                                        t.tag_category !== null
                                            ? 'text-gray-300'
                                            : 'inherit'
                                    }`}
                                />
                            </button>
                        </div>
                    )
                })
            ) : (
                <></>
            )}
        </div>
    )
}
