import MiniTag from '@/components/MiniTag'
import client from '@/database/client'
import { QueryData } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'

type TagSectionProps = {
  resourceId: number
}
export default function TagSection({ resourceId }: TagSectionProps) {
  const tagsQuery = useMemo(() => client
    .from('tag_resource')
    .select('tags(name)')
    .eq('resource_id', resourceId)
    , [resourceId])
  type TagsType = QueryData<typeof tagsQuery>
  const [tags, setTags] = useState<TagsType>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await tagsQuery
      if (error) throw error
      const tags: TagsType = data
      setTags(tags)
    }
    fetchData()
  }, [tagsQuery]) // Update the dependency array to include only resourceId

  return (
    <>
      {tags.map((tag) => {
        // @ts-expect-error: Problem with typing in supabase. Hopefully will be fixed soon
        return <MiniTag key={tag.tags.name}>{tag.tags.name}</MiniTag>
      })}
    </>
  )
}
