import { defaultStaleTime, popularTags } from '@/api/api'
import { FaTag } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Tag } from './Tag'
import { Link } from 'react-router-dom'

export default function PopularTopics() {
    const { isLoading, isError, data } = useQuery('popularTags', popularTags, {
        staleTime: defaultStaleTime,
    })

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <div>Oops, an error occured</div>
    }
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {data && data.data ? (
                data.data.map((t) => {
                    return (
                        // @ts-expect-error: supabase join problems
                        <Link to={`/resources?tag=${t.tags.name}`}>
                            <Tag
                                tag={{
                                    ...t.tags,
                                    id: -1,
                                    // @ts-expect-error: supabase join problem
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                    name: t.tags.name,
                                    tag_category: undefined,
                                }}
                                count={t.count}
                            />
                        </Link>
                    )
                })
            ) : (
                <div>No popular tags</div>
            )}
        </div>
    )
}
