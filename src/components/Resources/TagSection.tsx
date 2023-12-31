import { defaultStaleTime, getResourceTags } from '@/api/api'
import { FaTag } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Tag } from './Tag'
import { ITag } from '@/types'

type TTagSection = {
    resourceId: number
}
export default function TagSection({ resourceId }: TTagSection) {
    const { isLoading, isError, data } = useQuery(
        ['tags' + resourceId],
        () => getResourceTags(resourceId),
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <div>Oops, couldn't load tags</div>
    }
    return (
        <div className="flex flex-wrap gap-1">
            {data && data.data ? (
                // @ts-expect-error: supabase joining problems
                data.data.map((tag: ITag) => {
                    return <Tag tag={tag} key={tag.name} />
                })
            ) : (
                <>No tags found</>
            )}
        </div>
    )
}
