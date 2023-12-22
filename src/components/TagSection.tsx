import MiniTag from '@/components/MiniTag'
import client from '@/database/client'
import { QueryData } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'

type TTagSectionProps = {
    resourceId: number
}
export default function TagSection({ resourceId }: TTagSectionProps) {
    const tagsQuery = useMemo(
        () =>
            client
                .from('tag_resource')
                .select('tags(name)')
                .eq('resource_id', resourceId),
        [resourceId]
    )
    type TTagsType = QueryData<typeof tagsQuery>
    const [tags, setTags] = useState<TTagsType>([])

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await tagsQuery
            if (error) {
                throw error
            }
            const tags: TTagsType = data
            setTags(tags)
        }
        fetchData()
    }, [tagsQuery])

    return (
        <>
            {tags.map((tag) => {
                // @ts-expect-error: Problem with typing in supabase. Hopefully will be fixed soon
                return <MiniTag key={tag.tags.name}>{tag.tags.name}</MiniTag>
            })}
        </>
    )
}
