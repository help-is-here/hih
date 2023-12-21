export const H1 = (props: { title: string }) => {
    const { title } = props
    return (
        <h1 className="mb-4 text-center text-6xl text-gray-800 md:text-8xl">
            {title}
        </h1>
    )
}

export const H2 = (props: { title: string }) => {
    const { title } = props
    return (
        <h2 className="mb-4 text-center text-4xl text-gray-800 md:text-8xl">
            {title}
        </h2>
    )
}
