import { IResource, ITag } from '@/types'
import ValidatedInput from '../Form/ValidatedInput'
import ValidatedTextarea from '../Form/ValidatedTextarea'
import { useEffect, useState } from 'react'
import { Tag } from './Tag'
import { FaTimesCircle } from 'react-icons/fa'
import UpdateResourceButton from '../Form/UpdateResourceButton'

type TEditCard = {
    resource: IResource
    closeEdit: () => void
}
export default function EditCard({ resource, closeEdit }: TEditCard) {
    const [valid, setValid] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [tags, setTags] = useState<ITag[]>([])

    const removeTag = (tagId: number) => {
        let updatedTags = [...tags]
        updatedTags.splice(updatedTags.map((t) => t.id).indexOf(tagId), 1)
        setTags([...updatedTags])
    }

    useEffect(() => {
        setValid(
            !!name.length &&
                !!description.length &&
                !!link.length &&
                !!tags.length
        )
    }, [link, name, description, tags.length])

    useEffect(() => {
        if (resource.tag_resource) {
            setTags(resource.tag_resource)
        }
    }, [resource.tag_resource])
    return (
        <div>
            <div className="flex flex-col gap-2">
                <div>
                    <ValidatedInput
                        value={resource.name}
                        placeholder="Name"
                        onChange={setName}
                        validator={(name) => name.length > 0}
                    />
                    <ValidatedInput
                        value={resource.link}
                        placeholder="Link"
                        onChange={setLink}
                        validator={(link) => link.length > 0}
                    />
                    <ValidatedTextarea
                        value={resource.description}
                        placeholder="Description"
                        onChange={setDescription}
                        validator={(description) => description.length > 0}
                    />
                </div>
                <div className="flex flex-row gap-1">
                    {tags.map((tag) => {
                        return (
                            <div
                                key={tag.name}
                                className="align-center flex justify-between rounded-full bg-orange-300 px-2"
                            >
                                <Tag title={tag.name} />
                                <button onClick={() => removeTag(tag.id)}>
                                    <FaTimesCircle />
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className="flex items-center gap-4">
                    <div className="block rounded bg-orange-700 px-4 py-2 text-white md:block md:w-48">
                        <UpdateResourceButton
                            disabled={valid}
                            resource={{
                                ...resource,
                                name: name,
                                description: description,
                                link: link,
                                tag_resource: tags,
                            }}
                        >
                            Save
                        </UpdateResourceButton>
                    </div>
                    <button
                        onClick={closeEdit}
                        className="block rounded bg-orange-950 px-4 py-2 text-white md:block md:w-48"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
