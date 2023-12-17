import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { FormEvent, useState } from 'react'
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

    const submit = async (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const record = await resourcesQuery
        if (record.data === null) {
            return
        }
        for (const tag in tags) {
            const tagQuery = client
                .from('tags')
                .upsert({
                    name: tags[tag],
                })
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
    }

    return (
        <div className="w-6/12">
            <form>
                <h1 className="text-2xl pb-2">Suggest a Resource</h1>
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full mb-6 p-2 rounded"
                    onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setUrl(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br />
                <label htmlFor="tags" className="font-bold">
                    Tags
                </label>
                <br />
                <TagsInput value={tags} onChange={handleChange} />
                <input type="submit" value="Submit" onClick={submit} />
            </form>
        </div>
    )
}
