import { H2 } from '@/components/Text/Headings.tsx'
import { FaHeart } from 'react-icons/fa'

export const Card = (props: {
    title: string
    description: string
    tags: string[]
    numHearted: number
    link: string
}) => {
    const { title, description, tags, numHearted, link } = props
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div className="m-4 rounded border-2 border-solid border-white bg-white p-4 text-slate-900 drop-shadow-xl hover:border-orange-300 md:m-0 md:mb-4 md:break-inside-avoid-column">
                <Hearted number={numHearted} />
                <H2 title={title} />
                <div className="p-1text-center">{description}</div>
                <div className="mt-3 flex flex-row gap-1">
                    {tags.map((i) => {
                        return <Tag title={i} key={i} />
                    })}
                </div>
            </div>
        </a>
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
