import { Link } from 'react-router-dom'

type TagProps = {
    children: React.ReactNode
}

export default function MiniTag({ children }: TagProps) {
    return (
        <Link to={`/tag/${children}`}>
            <button className="text-xs bg-orange-500 rounded-full text-white px-2 py-1 hover:bg-orange-600">
                {children}
            </button>
        </Link>
    )
}
