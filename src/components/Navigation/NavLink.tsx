export const NavLink = (props: { title: string; link: string }) => {
    return (
        <button className="px-3 py-0 m-1 border-b-4 border-white hover:border-b-4 hover:border-orange-400">
            {props.title}
        </button>
    )
}
