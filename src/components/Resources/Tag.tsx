export const Tag = (props: { title: string }) => {
    const { title } = props
    return (
        <div className="rounded-full bg-orange-300 p-1 px-2 text-sm">
            {title}
        </div>
    )
}
