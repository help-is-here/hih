import { IResource } from '@/types'
import Hearted from '@/components/Resources/Hearted'
import Card from './Card'
import { Tag } from './Tag'
import { H2 } from '../Text/Headings'
import SessionWrapper from '../Auth/SessionWrapper'
import AddHeart from './AddHeart'

type TResourceCard = {
    resource: IResource
}
export const ResourceCard = ({ resource }: TResourceCard) => {
    return (
        <Card>
            <div>
                <div className="mb-4 flex w-full justify-between">
                    <SessionWrapper
                        ifSession={<AddHeart resourceId={resource.id} />}
                        notSession={<div></div>}
                    />
                    <Hearted resourceId={resource.id} />
                </div>
                <a href={resource.link} target="_blank" rel="noreferrer">
                    <H2 title={resource.name} />
                    <div className="p-1text-center">{resource.description}</div>
                    <div className="mt-3 flex flex-row flex-wrap gap-1">
                        {resource.tag_resource ? (
                            resource.tag_resource.map((tag) => {
                                return (
                                    <Tag
                                        title={tag.name}
                                        key={tag.name}
                                        color={tag.tag_category?.color}
                                    />
                                )
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </a>
            </div>
        </Card>
    )
}
