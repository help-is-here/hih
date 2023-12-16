export const NavLink = (props: { title: string; link: string }) => {
    return (
        <button className="p-3 m-1 hover:bg-orange-200 rounded">
            {props.title}
        </button>
    )
}
