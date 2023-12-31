import client from '@/database/client'
import { IResource, EAction, ICategory, ITag } from '@/types'

// Constants
export const defaultStaleTime = 1200000

// Queries
export const getUserAdmin = async () => {
    const {
        data: { user },
    } = await client.auth.getUser()
    return await client
        .from('admins')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id)
}

export const getTags = async () => {
    return await client
        .from('tags')
        .select('id, name, tag_category(id, name, color)')
}
export const getResourceTags = async (resourceId: number) => {
    return await client
        .from('tags')
        .select(
            'id, name, tag_category(id, name, color), tag_resource!inner(tag_id, resource_id)'
        )
        .eq('tag_resource.resource_id', resourceId)
}
export const getResources = async () => {
    return await client.from('resources').select()
}
export const getResourcesWithTags = async () => {
    return await client
        .from('resources')
        .select(
            'id, name, description, num_helped, link, in_review, tag_resource(...tags(name, id, tag_categories(name, color)))'
        )
}
export const getCategories = async () => {
    return await client
        .from('tag_categories')
        .select('id, name, color, tags(name, id)')
}
export const getHeartedCount = async (resourceId: number) => {
    return await client
        .from('hearted_resources')
        .select('*', { count: 'exact', head: true })
        .eq('resource_id', resourceId)
}
export const getFilteredResources = async (
    hearted: boolean,
    tags: string[],
    approved: boolean = true,
    search: string = ''
) => {
    const {
        data: { user },
    } = await client.auth.getUser()
    const heartedQuery = hearted
        ? 'hearted_resources!inner(user_id)'
        : 'hearted_resources(user_id)'
    const tagsQuery = tags.length
        ? 'tag_resource!inner(...tags!inner(name, id, tag_categories(name, color)))'
        : ' tag_resource(...tags(name, id, tag_categories(name, color)))'
    const query = client
        .from('resources')
        .select(
            `id, name, description, num_helped, link, in_review, ${heartedQuery}, ${tagsQuery})`
        )
    if (hearted) {
        query.filter('hearted_resources.user_id', 'eq', user?.id)
    }
    if (tags.length) {
        query.filter('tag_resource.tags.name', 'in', `(${tags.join(',')})`)
    }
    if (approved) {
        query.filter('in_review', 'eq', false)
    }
    if (search.trim().length > 1) {
        query.textSearch('fts', search.trim().split(' ').join(' & '))
    }
    return await query
}

export const popularTags = async () => {
    return await client
        .from('popular_tags')
        .select('count, tags(name, id, tag_category(id, name, color))')
}

export const textSearchResources = async (text: string) => {
    return await client
        .from('resources')
        .select()
        .textSearch('fts', text.trim().split(' ').join(' & '))
        .eq('in_review', false)
}

export const getIsHearted = async (resourceId: number) => {
    const {
        data: { user },
    } = await client.auth.getUser()
    return await client
        .from('hearted_resources')
        .select('*', { count: 'exact', head: true })
        .eq('resource_id', resourceId)
        .eq('user_id', user?.id)
}

// Mutations
export const saveTags = async (tags: ITag[]) => {
    for (const tag of tags) {
        if (tag.action === EAction.Add) {
            await client.from('tags').insert({ name: tag.name })
        } else if (tag.action === EAction.Remove) {
            await client.from('tags').delete().eq('id', tag.id)
        }
    }
}
export const deleteTag = async (tag: ITag) => {
    await client.from('tags').delete().eq('id', tag.id)
}
export const insertTag = async (tag: ITag) => {
    await client.from('tags').insert({
        name: tag.name,
        tag_category: tag.tag_category ? Number(tag.tag_category.id) : null,
    })
}
export const updateTag = async (tag: ITag) => {
    await client
        .from('tags')
        .update({
            name: tag.name,
            tag_category: tag.tag_category ? Number(tag.tag_category.id) : null,
        })
        .eq('id', tag.id)
}
export const updateResource = async (resource: IResource) => {
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
        } else if (t.action === EAction.Remove) {
            unlink.push(t)
        }
    })
    if (record.data && resource.tag_resource) {
        await linkAndCreateTags(record.data[0].id, link)
        await unLinkTags(record.data[0].id, unlink)
    }
}

export const deleteCategory = async (category: ICategory) => {
    await client.from('tag_categories').delete().eq('id', category.id)
}

export const updateCategory = async (category: ICategory) => {
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
        const newCat = { ...category, id: record.data[0].id }
        for (const t of category.tags) {
            if (t.action === EAction.Add) {
                await upsertTag({ ...t, tag_category: newCat })
            } else if (t.action === EAction.Remove) {
                await updateTag({ ...t, tag_category: undefined })
            }
        }
    }
}
export const upsertTag = async (tag: ITag) => {
    await client.from('tags').upsert(
        {
            name: tag.name,
            tag_category: tag.tag_category?.id,
        },
        { ignoreDuplicates: false, onConflict: 'name' }
    )
}
export const linkAndCreateTags = async (recordId: number, tags: ITag[]) => {
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            tag_id: tagRecord.data[0].id,
            resource_id: recordId,
        })
        await tagLinkQuery
    }
}
export const linkTags = async (recordId: number, tags: ITag[]) => {
    for (const tag of tags) {
        const tagRecord = await client
            .from('tags')
            .select('id')
            .eq('name', tag.name)
        if (!tagRecord.data) {
            continue
        }
        const tagLinkQuery = client.from('tag_resource').insert({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            tag_id: tagRecord.data[0].id,
            resource_id: recordId,
        })
        await tagLinkQuery
    }
}
export const unLinkTags = async (recordId: number, tags: ITag[]) => {
    for (const tag of tags) {
        const tagQuery = client
            .from('tag_resource')
            .delete()
            .eq('tag_id', tag.id)
            .eq('resource_id', recordId)
        await tagQuery
    }
}
export const deleteResource = async (resource: IResource) => {
    await client.from('resources').delete().eq('id', resource.id)
}
export const updateHeart = async (
    resourceId: number,
    alreadyHearted: boolean
) => {
    const {
        data: { user },
    } = await client.auth.getUser()
    if (!alreadyHearted) {
        await client
            .from('hearted_resources')
            .insert({ resource_id: resourceId, user_id: user?.id })
    } else {
        await client
            .from('hearted_resources')
            .delete()
            .eq('resource_id', resourceId)
            .eq('user_id', user?.id)
    }
}

export const insertResource = async (resource: IResource) => {
    const resourceQuery = client
        .from('resources')
        .insert({
            name: resource.name,
            description: resource.description,
            link: resource.link,
            in_review: resource.in_review,
        })
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
