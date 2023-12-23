import { H2 } from '@/components/Text/Headings.tsx'
import { IResource } from '@/types'
import { FaHeart } from 'react-icons/fa'

type TCard = {
    resource: IResource
}
export const Card = ({ resource }: TCard) => {
    return (
        <div>
            <Hearted number={resource.num_helped} />
            <H2 title={resource.name} />
            <div className="p-1text-center">{resource.description}</div>
            <div className="mt-3 flex flex-row gap-1">
                {resource.tag_resource.map((tag) => {
                    return <Tag title={tag.name} key={tag.name} />
                })}
            </div>
        </div>
    )
}

export const Tag = (props: { title: string }) => {
    const { title } = props
    return (
        <div className="rounded-full bg-orange-300 p-1 px-2 text-sm">
            {title}
        </div>
    )
}

export const Hearted = (props: { number: number }) => {
    const { number } = props
    return (
        <div className="flex flex-row items-center justify-end text-right">
            <span className="pr-1">
                <FaHeart color="#FF5B1F" />
            </span>
            {number}
        </div>
    )
}
