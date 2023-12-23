import { IResource } from '@/types'
import { Card } from './Card'
import CardShadow from './CardShadow'

type TResourceCard = {
    resource: IResource
}
export const ResourceCard = ({ resource }: TResourceCard) => {
    return (
        <a href={resource.link} target="_blank" rel="noreferrer">
            <CardShadow>
                <Card resource={resource} />
            </CardShadow>
        </a>
    )
}
