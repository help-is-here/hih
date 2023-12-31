import { IResource } from '@/types'
import Hearted from '@/components/Resources/Hearted'
import Card from './Card'
import { H2 } from '../Text/Headings'
import UpdateHeart from './UpdateHeart'
import TagSection from './TagSection'
import { AuthContext, TAuthContext } from '@/context/AuthContext.tsx'
import { useContext } from 'react'

type TResourceCard = {
    resource: IResource
}
export const ResourceCard = ({ resource }: TResourceCard) => {
    const { authenticated } = useContext<TAuthContext>(AuthContext)

    return (
        <Card>
            <div>
                <div className="mb-4 flex w-full justify-between">
                    {authenticated ? (
                        <UpdateHeart resourceId={resource.id} />
                    ) : (
                        <div></div>
                    )}
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
