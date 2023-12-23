import { IResource } from '@/types'
import CardShadow from './CardShadow'
import { useState } from 'react'
import { H2 } from '../Text/Headings'
import { Hearted, Tag } from './Card'
import { Link } from 'react-router-dom'
import ValidatedInput from '../Form/ValidatedInput'
import { useMutation, useQueryClient } from 'react-query'
import { updateResource, updateStatus } from '@/api/api'
import ValidatedTextarea from '../Form/ValidatedTextarea'
type TApprovedCard = {
    resource: IResource
}
export default function ApprovedCard({ resource }: TApprovedCard) {
    const queryClient = useQueryClient()
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    const save = useMutation(updateResource, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('resources')
            setEdit(false)
        },
    })
    const revoke = useMutation(updateStatus, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('resources')
        },
    })

    return (
        <div className="">
            <CardShadow>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full">
                        {edit ? (
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
                                        validator={(description) =>
                                            description.length > 0
                                        }
                                    />
                                </div>
                                <div className="flex flex-row gap-1">
                                    {resource.tag_resource ? (
                                        resource.tag_resource.map((tag) => {
                                            return (
                                                <Tag
                                                    title={tag.name}
                                                    key={tag.name}
                                                />
                                            )
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            save.mutate({
                                                ...resource,
                                                name: name,
                                                description: description,
                                                link: link,
                                            })
                                        }
                                        className="block rounded bg-orange-700 px-4 py-2 text-white md:block md:w-48"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex">
                                <div className="w-full">
                                    <H2 title={resource.name} />
                                    <div>
                                        <strong>Link:</strong> &nbsp;
                                        <Link
                                            className="text-gray text-sm underline"
                                            to={resource.link}
                                        >
                                            {resource.link}
                                        </Link>
                                    </div>

                                    <div className="flex justify-start">
                                        <strong>Liked: </strong>&nbsp;
                                        <Hearted number={resource.num_helped} />
                                    </div>
                                    <div className="w-full">
                                        <div className="p-1text-center">
                                            <strong>Description: </strong>{' '}
                                            &nbsp;
                                            {resource.description}
                                        </div>
                                        <div className="mt-3 flex flex-row gap-1">
                                            <strong>Tags: </strong> &nbsp;
                                            {resource.tag_resource ? (
                                                resource.tag_resource.map(
                                                    (tag) => {
                                                        return (
                                                            <Tag
                                                                title={tag.name}
                                                                key={tag.name}
                                                            />
                                                        )
                                                    }
                                                )
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 md:flex-col">
                                    <button
                                        onClick={() =>
                                            revoke.mutate({
                                                ...resource,
                                                in_review: true,
                                            })
                                        }
                                        className="rounded bg-orange-500 px-4 py-2 text-white md:block md:w-48"
                                    >
                                        Revoke Approval
                                    </button>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="rounded bg-orange-700 px-4 py-2 text-white md:block md:w-48"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardShadow>
        </div>
    )
}
