import { NavLink } from './NavLink.tsx'
import { FaBars, FaWindowClose } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import LoginButton from '../Auth/LoginButton.tsx'
import ProfileMenu from './ProfileMenu.tsx'
import { useContext, useEffect, useState } from 'react'
import { AuthContext, TAuthContext } from '@/context/AuthContext.tsx'

export const Navigation = () => {
    const { authenticated, admin } = useContext<TAuthContext>(AuthContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    // Disable scroll when mobile menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
        } else {
            document.body.style.overflow = 'visible'
            document.body.style.position = 'unset'
        }
    }, [isOpen])
    return (
        <>
            <div className="flex w-full items-center justify-between bg-white p-8 md:justify-center">
                <div className="justify-self-start">
                    <img src={logo} alt="logo" className="h-12" />
                </div>
                <div className="hidden grow justify-center md:flex">
                    <NavLink title="Home" link="/" />
                    <NavLink title="Resources" link="/resources" />
                    <NavLink title="Panic Page" link="/panic" />
                    {authenticated ? (
                        <NavLink
                            title="Suggest a Resource"
                            link="/secure/suggest"
                        />
                    ) : (
                        <></>
                    )}
                    {admin ? (
                        <NavLink title="Admin" link="/secure/admin" />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="hidden md:block">
                    {authenticated ? <ProfileMenu /> : <LoginButton />}
                </div>
                <div
                    className="flex items-center justify-self-end md:hidden"
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    {isOpen ? (
                        <FaWindowClose size="2.5em" color="rgb(249 115 22)" />
                    ) : (
                        <FaBars size="2.5em" color="rgb(249 115 22)" />
                    )}
                </div>
            </div>
            {isOpen ? (
                <div className="fixed z-50 flex h-[calc(100%-112px)] w-full flex-col items-center bg-white transition-all md:hidden">
                    <NavLink title="Home" link="/" />
                    <NavLink title="Resources" link="/resources" />
                    <NavLink title="Panic Page" link="/panic" />
                    {authenticated ? (
                        <NavLink
                            title="Suggest a Resource"
                            link="/secure/suggest"
                        />
                    ) : (
                        <></>
                    )}
                    {admin ? <NavLink title="Admin" link="/admin" /> : <></>}
                    {authenticated ? <ProfileMenu /> : <LoginButton />}
                </div>
            ) : null}
        </>
    )
}
