import { ICategory, ITag } from '@/types'
import { calculateTextColor } from '@/utils/color'
import { useEffect, useState } from 'react'

export const Tag = ({
    tag,
    category,
    count,
}: {
    tag: ITag
    category?: ICategory
    count?: number
}) => {
    const [color, setColor] = useState<string>('#fdba74')

    useEffect(() => {
        if (tag.tag_category && tag.tag_category.color.trim()) {
            setColor(tag.tag_category.color)
        } else if (category !== undefined) {
            setColor(category.color)
        }
    }, [category, tag])
    return (
        <div
            className="align-center flex justify-between rounded-full px-2 py-1 "
            style={{
                background: color,
                color: calculateTextColor(color),
            }}
        >
            {tag.name}
            {count && count !== -1 ? (
                <div className="rounded-full bg-orange-50 px-1 text-black">
                    {String(count)}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
