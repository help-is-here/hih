import { IResource } from '@/types'
import CardShadow from './CardShadow'
import client from '@/database/client'
import { useState } from 'react'
import { H2 } from '../Text/Headings'
import { Hearted, Tag } from './Card'
import { Link } from 'react-router-dom'

type TApprovedCard = {
    resource: IResource
}
export default function ApprovedCard({ resource }: TApprovedCard) {
    const [edit, setEdit] = useState(false)

    const revoke = async (row: IResource) => {
        await client
            .from('resources')
            .update({ in_review: false })
            .eq('id', row.id)
    }
    return (
        <div className="">
            <CardShadow>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full">
                        {edit ? (
                            <></>
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
                                            {resource.tag_resource.map(
                                                (tag) => {
                                                    return (
                                                        <Tag
                                                            title={tag.name}
                                                            key={tag.name}
                                                        />
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 md:flex-col">
                                    <button
                                        onClick={async () =>
                                            await revoke(resource)
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
