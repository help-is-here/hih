import { NavLink } from './NavLink.tsx'
import { FaBars } from 'react-icons/fa'
import logo from '../../assets/logo.png'

export const Navigation = () => {
    return (
        <div className="w-full bg-white p-8 flex md:justify-center justify-between">
            <div className="justify-self-start">
                <img src={logo} alt="logo" className="h-12" />
            </div>
            <div className="hidden grow md:flex justify-center">
                <NavLink title="Home" link="/" />
                <NavLink title="Panic Page" link="/" />
                <NavLink title="Submit a Resource" link="/" />
                <NavLink title="Admin" link="/" />
            </div>
            <div className="hidden md:block py-3 px-8 m-1 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600">
                <a href="/login">Login</a>
            </div>
            <div className="md:hidden justify-self-end flex items-center">
                <FaBars size="2.5em" color="rgb(249 115 22)" />
            </div>
        </div>
    )
}
