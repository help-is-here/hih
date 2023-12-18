type TagProps = {
    children: React.ReactNode
}

export default function Tag({ children }: TagProps) {
    return (
        <div className="rounded-full bg-orange-900 px-4 py-2 text-white">
            {children}
        </div>
    )
}
