import { IResource } from '@/types'
import Card from './Card'
import { H2 } from '../Text/Headings'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Hearted from './Hearted'
import { Tag } from './Tag'
import UpdateResourceButton from '../Form/UpdateResourceButton'

type TUnapprovedCard = {
    resource: IResource
}
export default function UnaprovedCard({ resource }: TUnapprovedCard) {
    const [edit, setEdit] = useState(false)

    return (
        <div className="">
            <Card>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full">
                        {edit ? (
                            <EditCard resource={resource} />
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
                                        <Hearted num={resource.num_helped} />
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
                                <div className="flex justify-center gap-2 md:flex-col">
                                    <div className="w-24 rounded bg-orange-500 px-4 py-2 text-white md:block md:w-48">
                                        <UpdateResourceButton
                                            resource={{
                                                ...resource,
                                                in_review: false,
                                            }}
                                        >
                                            Approve
                                        </UpdateResourceButton>
                                    </div>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="w-24 rounded bg-orange-700 px-4 py-2 text-white md:block md:w-48"
                                    >
                                        Edit
                                    </button>
                                    <button className="w-24 rounded bg-orange-950 px-4 py-2 text-white md:block md:w-48">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}
