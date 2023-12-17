export const H1 = (props: { title: string }) => {
    const { title } = props
    return (
        <h1 className="md:text-8xl text-center mb-4 text-gray-800 text-6xl">
            {title}
        </h1>
    )
}
