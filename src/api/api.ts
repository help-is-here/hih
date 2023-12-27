import client from '@/database/client'
import { IResource, EAction, ICategory, ITag } from '@/types'

// Constants
export const defaultStaleTime = 1200000

// Queries
const getTags = async () => {
    return await client
        .from('tags')
        .select('id, name, tag_category(id, name, color)')
}
const getResources = async () => {
    return await client.from('resources').select()
}
const getResourcesWithTags = async () => {
    return await client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, in_review, tag_resource(...tags(name, id, tag_categories(name, color)))'
        )
}
const getCategories = async () => {
    return await client
        .from('tag_categories')
        .select('id, name, color, tags(name, id)')
}
const getHeartedCount = async (resourceId: number) => {
    return await client
        .from('hearted_resources')
        .select('*', { count: 'exact', head: true })
        .eq('resource_id', resourceId)
}

// Mutations
const insertTag = async (tag: ITag) => {
    await client.from('tags').insert({
        name: tag.name,
        tag_category: tag.tag_category ? Number(tag.tag_category.id) : null,
    })
}
const updateTag = async (tag: ITag) => {
    await client
        .from('tags')
        .update({
            name: tag.name,
            tag_category: tag.tag_category ? Number(tag.tag_category.id) : null,
        })
        .eq('id', tag.id)
}
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
    const link: ITag[] = []
    const unlink: ITag[] = []
    resource.tag_resource?.forEach((t) => {
        if (t.action === EAction.Add) {
            link.push(t)
        } else {
            unlink.push(t)
        }
    })
    if (record.data && resource.tag_resource) {
        await linkTags(record.data[0].id, link)
        await unLinkTags(record.data[0].id, unlink)
    }
}

const updateCategory = async (category: ICategory) => {
    let categoryQuery
    if (category.id === -1) {
        categoryQuery = client
            .from('tag_categories')
            .insert({
                name: category.name,
                color: category.color,
            })
            .select('id')
    } else {
        categoryQuery = client
            .from('tag_categories')
            .update({
                name: category.name,
                color: category.color,
            })
            .eq('id', category.id)
            .select('id')
    }
    const record = await categoryQuery

    if (record.data && category.tags) {
        category.tags?.forEach((t) => {
            if (t.action === EAction.Add) {
                if (t.id !== -1) {
                    updateTag({ ...t, tag_category: category })
                } else {
                    insertTag({ ...t, tag_category: category })
                }
            } else if (t.action === EAction.Remove) {
                updateTag({ ...t, tag_category: undefined })
            }
        })
    }
}
const linkTags = async (recordId: number, tags: ITag[]) => {
    for (const tag of tags) {
        const tagQuery = client
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
            resource_id: recordId,
        })
        await tagLinkQuery
    }
}
const unLinkTags = async (recordId: number, tags: ITag[]) => {
    for (const tag of tags) {
        const tagQuery = client
            .from('tag_resource')
            .delete()
            .eq('tag_id', tag.id)
            .eq('resource_id', recordId)
        await tagQuery
    }
}
const deleteResource = async (resource: IResource) => {
    await client.from('resources').delete().eq('id', resource.id)
}
const addHeart = async (resourceId: number) => {
    const {
        data: { user },
    } = await client.auth.getUser()
    await client
        .from('hearted_resources')
        .insert({ resource_id: resourceId, user_id: user?.id })
}
export {
    getResources,
    getResourcesWithTags,
    updateResource,
    deleteResource,
    getCategories,
    updateCategory,
    getTags,
    getHeartedCount,
    addHeart,
}
