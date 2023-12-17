export const NavLink = (props: { title: string; link: string }) => {
    const { title, link } = props
    const nav = (link: string) => {
        window.location.href = link
    }
    return (
        <button
            className="px-3 py-0 m-1 border-b-4 border-white hover:border-b-4 hover:border-orange-400"
            onClick={() => nav(link)}
        >
            {title}
        </button>
    )
}
