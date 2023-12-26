import client from '@/database/client'
import { IResource, Action } from '@/types'

// Constants
export const defaultStaleTime = 1200000

// Queries
const getResources = async () => {
    return await client.from('resources').select()
}
const getResourcesWithTags = async () => {
    return await client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, in_review, tag_resource(...tags(name, id))'
        )
}

// Mutations
const updateResource = async (resource: IResource) => {
    const resourceQuery = client
        .from('resources')
        .update({
            name: resource.name,
            description: resource.description,
            link: resource.link,
            num_helped: resource.num_helped,
            in_review: resource.in_review,
        })
        .eq('id', resource.id)
        .select('id')

    const record = await resourceQuery
    if (record.data === null) {
        return
    }
    if (!resource.tag_resource) {
        return
    }
    for (const tag of resource.tag_resource) {
        let tagQuery
        if (tag.action === Action.Add) {
            tagQuery = client
                .from('tags')
                .upsert(
                    {
                        name: tag.name,
                    },
                    { ignoreDuplicates: false, onConflict: 'name' }
                )
                .select('id')

            const tagRecord = await tagQuery
            if (tagRecord.data === null) {
                continue
            }
            const tagLinkQuery = client.from('tag_resource').insert({
                tag_id: tagRecord.data[0].id,
                resource_id: record.data[0].id,
            })
            await tagLinkQuery
        } else if (Action.Remove) {
            tagQuery = client
                .from('tag_resource')
                .delete()
                .eq('tag_id', tag.id)
                .eq('resource_id', record.data[0].id)
            await tagQuery
        }
    }
}

export { getResources, getResourcesWithTags, updateResource }
