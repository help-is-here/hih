import { useEffect, useState } from 'react'

export const NavLink = (props: { title: string; link: string }) => {
    const { title, link } = props
    const nav = (link: string) => {
        window.location.href = link
    }
    const [highlight, setHighlight] = useState(false)
    const currentPage = window.location.pathname

    useEffect(() => {
        if (link.toLowerCase() === currentPage.toLowerCase()) {
            setHighlight(true)
        } else {
            setHighlight(false)
        }
    }, [link, currentPage])
    return (
        <button
            className={`m-1 border-b-4 border-white px-3 py-0 hover:border-b-4 hover:border-orange-400 ${
                highlight ? 'font-semibold' : ''
            }`}
            onClick={() => nav(link)}
        >
            {title}
        </button>
    )
}
