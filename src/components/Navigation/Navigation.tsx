import { NavLink } from './NavLink.tsx'
import { FaBars } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import LoginButton from '../Auth/LoginButton.tsx'
import SessionWrapper from '../Auth/SessionWrapper.tsx'
import ProfileMenu from './ProfileMenu.tsx'

export const Navigation = () => {
    return (
        <div className="flex w-full items-center justify-between bg-white p-8 md:justify-center">
            <div className="justify-self-start">
                <img src={logo} alt="logo" className="h-12" />
            </div>
            <div className="hidden grow justify-center md:flex">
                <NavLink title="Home" link="/" />
                <NavLink title="Resources" link="/resources" />
                <NavLink title="Panic Page" link="/panic" />
                <NavLink title="Suggest a Resource" link="/suggest" />
                <NavLink title="Admin" link="/admin" />
            </div>
            <div className="hidden md:block">
                <SessionWrapper
                    ifSession={<ProfileMenu />}
                    notSession={<LoginButton />}
                />
            </div>
            <div className="flex items-center justify-self-end md:hidden">
                <FaBars size="2.5em" color="rgb(249 115 22)" />
            </div>
        </div>
    )
}
