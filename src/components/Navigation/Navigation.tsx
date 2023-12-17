import { NavLink } from './NavLink.tsx'
import { FaBars } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import LoginButton from '../Auth/LoginButton.tsx'
import SessionWrapper from '../Auth/SessionWrapper.tsx'
import LogoutButton from '../Auth/LogoutButton.tsx'

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
            <div className="hidden md:block">
                <SessionWrapper
                    ifSession={<LogoutButton />}
                    notSession={<LoginButton />}
                />
            </div>
            <div className="md:hidden justify-self-end flex items-center">
                <FaBars size="2.5em" color="rgb(249 115 22)" />
            </div>
        </div>
    )
}
