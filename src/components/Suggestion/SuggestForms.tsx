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
                <h1 className="text-3xl pb-2">Input a Resource</h1>
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full mb-6 p-2 rounded"
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
                    className="w-full mb-6 p-2 rounded"
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
                    className="w-full mb-6 p-2 rounded"
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
                    className="px-8 py-3 bg-orange-500 rounded-full m-2 mt-6 text-white ml-0 enabled:hover:bg-orange-600 font-bold disabled:bg-gray-300"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
