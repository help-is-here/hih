import { Link } from 'react-router-dom'

type TagProps = {
    children: React.ReactNode
}

export default function MiniTag({ children }: TagProps) {
    return (
        <Link to={`/tag/${children}`}>
            <button className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white hover:bg-orange-600">
                {children}
            </button>
        </Link>
    )
}
