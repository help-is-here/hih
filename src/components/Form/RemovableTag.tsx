import { ICategory, ITag } from '@/types'
import { calculateTextColor } from '@/utils/color'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

type TRemovableTag = {
    tag: ITag
    category?: ICategory
    onRemove: (t: ITag) => void
}
export default function RemovableTag({
    tag,
    category,
    onRemove,
}: TRemovableTag) {
    const [color, setColor] = useState('#fdba74')

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
            <button className="ms-3" onClick={() => onRemove(tag)}>
                <FaTimes />
            </button>
        </div>
    )
}
