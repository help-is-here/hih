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
                                // @ts-expect-error: supabase join problems
                                title={t.tags.name}
                                color={
                                    // @ts-expect-error: supabase join problems
                                    t.tags.tag_category
                                        ? // @ts-expect-error: supabase join problems
                                          t.tags.tag_category.color
                                        : '#ffffff'
                                }
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
