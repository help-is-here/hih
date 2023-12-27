import { addHeart } from '@/api/api'
import { FaHeart } from 'react-icons/fa'
import { useQueryClient, useMutation } from 'react-query'

type TAddHeart = {
    resourceId: number
}
export default function AddHeart({ resourceId }: TAddHeart) {
    const queryClient = useQueryClient()
    const addHeartMut = useMutation({
        mutationFn: addHeart,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ['hearted' + resourceId],
            })
        },
    })
    return (
        <button
            onClick={() => addHeartMut.mutate(resourceId)}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-2 py-1 text-xs"
        >
            Add
            <FaHeart color="#FF5B1F" />
        </button>
    )
}
