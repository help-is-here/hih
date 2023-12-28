import client from '@/database/client'
import { IResource } from '@/types'

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
    return client
        .from('resources')
        .update({
            name: resource.name,
            description: resource.description,
            link: resource.link,
            num_helped: resource.num_helped,
            in_review: resource.in_review,
        })
        .eq('id', resource.id)
        .select()
}

export { getResources, getResourcesWithTags, updateResource }
