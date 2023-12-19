import TagsInput from 'react-tagsinput'
import '../../utils/react-tagsinput.css'
import { FormEvent, useEffect, useState } from 'react'
import client from '@/database/client.tsx'
export const ResourceForm = () => {
    const handleChange = (input: string[]) => {
        setTags(input)
    }

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const resourcesQuery = client
        .from('resources')
        .upsert({
            name: title,
            link: url,
            description: description,
        })
        .select('id')

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const record = await resourcesQuery
        if (record.data === null) {
            return
        }
        for (const tag in tags) {
            const tagQuery = client
                .from('tags')
                .upsert(
                    {
                        name: tags[tag],
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
        }
        setTitle('')
        setUrl('')
        setDescription('')
        setTags([])
    }

    const [isDisabled, setIsDisabled] = useState(false)
    useEffect(() => {
        if (title && url && description) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [title, url, description])
    return (
        <div className="w-6/12">
            <form id="suggest-form" onSubmit={submit}>
                <h1 className="pb-2 text-3xl">Input a Resource</h1>
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="mb-6 w-full rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <br />
                <label htmlFor="url" className="font-bold">
                    URL
                </label>
                <br />
                <input
                    type="text"
                    id="url"
                    name="url"
                    className="mb-6 w-full rounded p-2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />

                <br />
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    className="mb-6 w-full rounded p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <br />
                <label htmlFor="tags" className="font-bold">
                    Tags
                </label>
                <br />
                <TagsInput value={tags} onChange={handleChange} />
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="m-2 ml-0 mt-6 rounded-full bg-orange-500 px-8 py-3 font-bold text-white enabled:hover:bg-orange-600 disabled:bg-gray-300"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
