import { IResource, ITag } from '@/types'
import ValidatedInput from '../Form/ValidatedInput'
import ValidatedTextarea from '../Form/ValidatedTextarea'
import { useEffect, useState } from 'react'
import TagUpdater from '../Form/TagUpdater'
import { useMutation, useQueryClient } from 'react-query'
import { updateResource } from '@/api/api'

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

    const queryClient = useQueryClient()
    const updateResourceMut = useMutation({
        mutationFn: updateResource,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] })
            saved()
        },
    })

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
                <TagUpdater initTags={tags} onSet={setUpdatedTags} />
                <div className="flex items-center gap-4">
                    <button
                        className="block rounded bg-orange-700 px-4 py-2 text-white disabled:bg-gray-300 md:block md:w-48 "
                        disabled={!valid}
                        onClick={() => {
                            updateResourceMut.mutate({
                                id: resource.id,
                                num_helped: 0,
                                in_review: resource.in_review,
                                name: name,
                                description: description,
                                link: link,
                                tag_resource: updatedTags,
                            })
                        }}
                    >
                        Save
                    </button>
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
