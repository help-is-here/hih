type TagProps = {
    children: React.ReactNode
}

export default function MiniTag({ children }: TagProps) {
    return (
        <button className="text-xs bg-orange-500 rounded-full text-white px-2 py-1 hover:bg-orange-600">
            {children}
        </button>
    )
}
