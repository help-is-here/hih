import { ITag } from '@/types'
import { useEffect, useState } from 'react'
import { calculateTextColor } from '@/utils/color'
import { FaCheck } from 'react-icons/fa'

type TToggleTag = {
    tagData: ITag
    onToggle: (toggle: boolean) => void
}
export default function ToggleTag({ tagData, onToggle }: TToggleTag) {
    const [toggle, setToggle] = useState(false)
    const [background, setBackground] = useState('')

    useEffect(() => {
        setBackground(
            tagData.tag_category ? tagData.tag_category.color : '#fdba74'
        )
    }, [tagData.tag_category])
    return (
        <button
            onClick={() => {
                onToggle(!toggle)
                setToggle(!toggle)
            }}
            style={{
                background: background,
                color: calculateTextColor(background),
            }}
            className={`relative rounded-full px-2 py-1 text-sm shadow shadow-current hover:opacity-50 ${
                toggle ? 'bottom-1 left-1 shadow-md' : 'shadow-none'
            }`}
        >
            <div className="flex items-center justify-between">
                {toggle ? <FaCheck /> : <></>}
                {tagData.name}
            </div>
        </button>
    )
}
