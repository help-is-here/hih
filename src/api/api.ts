import client from '@/database/client'
import { IResource } from '@/types'

// Constants
export const defaultStaleTime = 12000

// Queries
const getResources = async () => {
    return await client.from('resources').select()
}
const getResourcesWithTags = async () => {
    return await client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, in_review, tag_resource(...tags(name))'
        )
}

// Mutations
const updateStatus = async (resource: IResource) => {
    return client
        .from('resources')
        .update({ in_review: resource.in_review })
        .eq('id', resource.id)
}

const updateLikes = async (resource: IResource) => {
    await client
        .from('resources')
        .update({ num_helped: resource.num_helped })
        .eq('id', resource.id)
}

const updateResource = async (resource: IResource) => {
    return client
        .from('resources')
        .update({
            name: resource.name,
            description: resource.description,
            link: resource.link,
        })
        .eq('id', resource.id)
}

export {
    getResources,
    getResourcesWithTags,
    updateStatus,
    updateResource,
    updateLikes,
}
