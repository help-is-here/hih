import { defaultStaleTime, getHeartedCount } from '@/api/api'
import { FaHeart, FaSun } from 'react-icons/fa'
import { useQuery } from 'react-query'

type THearted = {
    resourceId: number
}
export default function Hearted({ resourceId }: THearted) {
    const { isError, isLoading, data } = useQuery(
        ['hearted' + resourceId],
        () => getHeartedCount(resourceId),
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) {
        return <FaHeart className="animate-spin" />
    }
    if (isError) {
        return <div>Oops!</div>
    }
    return data && data.count && data.count !== 0 ? (
        <button className="flex flex-row items-center justify-end text-right">
            <span className="pr-1">
                <FaHeart color="#FF5B1F" />
            </span>
            {String(data.count)}
        </button>
    ) : (
        <div className="flex items-center">
            <FaSun className="ml-1 text-orange-500" /> New!
        </div>
    )
}
