import { EAction, IResource, ITag } from '@/types'
import ValidatedInput from '../Form/ValidatedInput'
import ValidatedTextarea from '../Form/ValidatedTextarea'
import { useEffect, useState } from 'react'
import UpdateResourceButton from '../Form/UpdateResourceButton'
import TagsInput from 'react-tagsinput'

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
    const [updatedTags, setUpdatedTags] = useState<ITag[]>([])
    const [updatedResource, setUpdatedResource] = useState<IResource>({
        name: '',
        description: '',
        id: -1,
        link: '',
        tag_resource: [],
        num_helped: 0,
        in_review: true,
    })

    const updateTags = (newTags: string[]) => {
        const newUpdates = []
        for (const tagName of newTags) {
            if (!tags.map((t) => t.name).includes(tagName)) {
                newUpdates.push({
                    name: tagName,
                    action: EAction.Add,
                    id: -1,
                    category: '',
                })
            }
        }
        for (const tag of tags) {
            if (!newTags.includes(tag.name)) {
                newUpdates.push({ ...tag, action: EAction.Remove })
            }
        }
        setUpdatedTags(newUpdates)
    }

    const saved = () => {
        setUpdatedTags([])
        closeEdit()
    }

    useEffect(() => {
        setValid(
            name.length > 0 &&
                description.length > 0 &&
                link.length > 0 &&
                (tags.length > 0 || updatedTags.length > 0)
        )
        setUpdatedResource({
            name: name,
            description: description,
            id: resource.id,
            link: link,
            tag_resource: updatedTags,
            num_helped: resource.num_helped,
            in_review: resource.in_review,
        })
    }, [link, name, description, tags.length, resource, updatedTags])

    useEffect(() => {
        if (resource.tag_resource) {
            setTags(resource.tag_resource)
        }
        setName(resource.name)
        setDescription(resource.description)
        setLink(resource.link)
    }, [resource])
    return (
        <div>
            <div className="flex flex-col gap-2">
                <div>
                    <ValidatedInput
                        value={resource.name}
                        placeholder="Name"
                        onChange={(val) => setName(val)}
                        validator={(name) => name.length > 0}
                    />
                    <ValidatedInput
                        value={resource.link}
                        placeholder="Link"
                        onChange={(val) => setLink(val)}
                        validator={(link) => link.length > 0}
                    />
                    <ValidatedTextarea
                        value={resource.description}
                        placeholder="Description"
                        onChange={(val) => setDescription(val)}
                        validator={(description) => description.length > 0}
                    />
                </div>
                <TagsInput
                    value={[
                        ...tags
                            .map((t) => t.name)
                            .filter(
                                (name) =>
                                    !updatedTags
                                        .filter(
                                            (t) => t.action === EAction.Remove
                                        )
                                        .map((t) => t.name)
                                        .includes(name)
                            ),
                        ...updatedTags
                            .filter((t) => t.action === EAction.Add)
                            .map((t) => t.name),
                    ]}
                    onChange={updateTags}
                />

                <div className="flex items-center gap-4">
                    <UpdateResourceButton
                        className="block rounded bg-orange-700 px-4 py-2 text-white disabled:bg-gray-300 md:block md:w-48 "
                        disabled={!valid}
                        resource={updatedResource}
                        onSucces={saved}
                    >
                        Save
                    </UpdateResourceButton>
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
