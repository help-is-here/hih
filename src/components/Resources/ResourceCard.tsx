import { IResource } from '@/types'
import Hearted from '@/components/Resources/Hearted'
import Card from './Card'
import { H2 } from '../Text/Headings'
import SessionWrapper from '../Auth/SessionWrapper'
import UpdateHeart from './UpdateHeart'
import TagSection from './TagSection'

type TResourceCard = {
    resource: IResource
}
export const ResourceCard = ({ resource }: TResourceCard) => {
    return (
        <Card>
            <div>
                <div className="mb-4 flex w-full justify-between">
                    <SessionWrapper
                        ifSession={<UpdateHeart resourceId={resource.id} />}
                        notSession={<div></div>}
                    />
                    <Hearted resourceId={resource.id} />
                </div>
                <a href={resource.link} target="_blank" rel="noreferrer">
                    <H2 title={resource.name} />
                    <div className="p-1text-center">{resource.description}</div>
                    <div className="mt-3 flex flex-row flex-wrap gap-1">
                        <TagSection resourceId={resource.id} />
                    </div>
                </a>
            </div>
        </Card>
    )
}
