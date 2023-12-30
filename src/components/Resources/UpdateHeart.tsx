import { defaultStaleTime, getIsHearted, updateHeart } from '@/api/api'
import { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useQueryClient, useMutation, useQuery } from 'react-query'

type TUpdateHeart = {
    resourceId: number
}
export default function UpdateHeart({ resourceId }: TUpdateHeart) {
    const [alreadyHearted, setAlreadyHearted] = useState(false)

    const { isLoading, isError, data } = useQuery(
        ['isHearted' + resourceId],
        () => getIsHearted(resourceId),
        {
            staleTime: defaultStaleTime,
        }
    )

    useEffect(() => {
        if (data && data.count !== null) {
            setAlreadyHearted(data?.count > 0)
        }
    }, [data, data?.count])
    const queryClient = useQueryClient()
    const updateHeartMut = useMutation({
        mutationFn: () => updateHeart(resourceId, alreadyHearted),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ['hearted' + resourceId],
            })
            queryClient.invalidateQueries({
                queryKey: ['userHearted'],
            })
            queryClient.invalidateQueries({
                queryKey: ['isHearted' + resourceId],
            })
        },
    })

    if (isLoading) {
        return <FaHeart className="animate-spine" />
    }
    if (isError) {
        return <div>Oops, couldn't load</div>
    }
    return (
        <button
            onClick={() => updateHeartMut.mutate()}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-2 py-1 text-xs"
        >
            {alreadyHearted ? 'Unlike' : 'Add'}
            <FaHeart color="#FF5B1F" />
        </button>
    )
}
