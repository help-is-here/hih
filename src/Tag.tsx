type TagProps = {
    children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
    return (
        <div className="bg-orange-900 rounded-full text-white px-4 py-2">
            {children}
        </div>
    )
}
