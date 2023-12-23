import React from 'react'

type TCardShadow = {
    children: React.ReactNode
}
export default function CardShadow({ children }: TCardShadow) {
    return (
        <div className="m-4 rounded border-2 border-solid border-white bg-white p-4 text-slate-900 drop-shadow-xl hover:border-orange-300 md:m-0 md:mb-4 md:break-inside-avoid-column">
            {children}
        </div>
    )
}
