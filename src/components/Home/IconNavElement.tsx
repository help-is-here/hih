export const IconNavElement = (props: {
    title: string
    image: string
    link: string
}) => {
    const { title, image, link } = props
    return (
        <a href={link}>
            <div className="flex justify-center px-4 py-8 bg-orange-200 rounded flex-col text-center items-center hover:bg-orange-300 h-48 mr-4 w-48 mt-8">
                <img src={image} alt={title} width="100px" />
                <h4 className="pt-4">{title}</h4>
            </div>
        </a>
    )
}
