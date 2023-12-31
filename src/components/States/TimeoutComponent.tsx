import React, { useEffect, useState } from 'react'

export default function TimeoutComponent({
    children,
    timeout,
    show,
}: {
    children: React.ReactNode
    timeout: number
    show: boolean
}) {
    const [toggle, setToggle] = useState(true)
    useEffect(() => {
        setToggle(show)
        if (show) {
            setTimeout(() => setToggle(false), timeout)
        }
    }, [show, timeout])
    return <div className={`${toggle ? 'block' : 'hidden'}`}>{children}</div>
}
