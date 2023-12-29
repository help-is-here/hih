import React from 'react'

type TMasonryLayout = {
    children: React.ReactNode
}
export default function MasonryLayout({ children }: TMasonryLayout) {
    return (
        <section className="px-3 pb-3 md:columns-1 md:overflow-auto lg:columns-2 xl:columns-3">
            {children}
        </section>
    )
}
