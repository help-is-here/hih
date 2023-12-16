import { NavLink } from './NavLink.tsx'

export const Navigation = () => {
    return (
        <div className="w-full bg-white p-8 flex justify-center">
            <div className="">Help Is Here</div>
            <div className="navlinks">
                <NavLink title="Home" link="/" />
                <NavLink title="Panic Page" link="/" />
                <NavLink title="Submit a Resource" link="/" />
                <NavLink title="Admin" link="/" />
            </div>
        </div>
    )
}
