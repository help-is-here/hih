type TagProps = {
    children: React.ReactNode
}

export default function MiniTag({ children }: TagProps) {
    return (
        <div className="bg-orange-500 rounded-full text-white px-2 py-1">
            {children}
        </div>
    )
}
