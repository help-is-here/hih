import { IResource } from '@/types'
import Hearted from '@/components/Resources/Hearted'
import Card from './Card'
import { Tag } from './Tag'
import { H2 } from '../Text/Headings'

type TResourceCard = {
    resource: IResource
}
export const ResourceCard = ({ resource }: TResourceCard) => {
    return (
        <a href={resource.link} target="_blank" rel="noreferrer">
            <Card>
                <div>
                    <Hearted num={resource.num_helped} />
                    <H2 title={resource.name} />
                    <div className="p-1text-center">{resource.description}</div>
                    <div className="mt-3 flex flex-row gap-1">
                        {resource.tag_resource ? (
                            resource.tag_resource.map((tag) => {
                                return <Tag title={tag.name} key={tag.name} />
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </Card>
        </a>
    )
}
