export const IconNavElement = (props: {
    title: string
    image: string
    link: string
}) => {
    const { title, image, link } = props
    return (
        <a href={link}>
            <div className="mr-4 mt-8 flex h-48 w-48 flex-col items-center justify-center rounded bg-orange-200 px-4 py-8 text-center hover:bg-orange-300">
                <img src={image} alt={title} width="100px" />
                <h4 className="pt-4">{title}</h4>
            </div>
        </a>
    )
}
