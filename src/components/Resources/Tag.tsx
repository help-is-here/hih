import { calculateTextColor } from '@/utils/color'

export const Tag = (props: {
    title: string
    color?: string
    count?: number
}) => {
    const { title, color = '#fdba74', count = -1 } = props
    return (
        <div
            style={{ background: color, color: calculateTextColor(color) }}
            className="flex items-center justify-between gap-1 rounded-full px-2 py-1 text-sm"
        >
            {title}
            {count !== -1 ? (
                <div className="rounded-full bg-orange-50 px-1 text-black">
                    {String(count)}
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
