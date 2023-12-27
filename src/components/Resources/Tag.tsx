import { calculateTextColor } from '@/utils/color'

export const Tag = (props: { title: string; color?: string }) => {
    const { title, color = '#fdba74' } = props
    return (
        <div
            style={{ background: color, color: calculateTextColor(color) }}
            className="rounded-full px-2 py-1 text-sm"
        >
            {title}
        </div>
    )
}
