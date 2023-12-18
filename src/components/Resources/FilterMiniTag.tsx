import { Dispatch, SetStateAction, useState } from 'react'

export const FilterMiniTag = (props: {
    title: string
    setFilter: Dispatch<SetStateAction<string[]>>
}) => {
    const { title, setFilter } = props
    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive(!active)
        setFilter((prevState) => {
            if (prevState.indexOf(title) > -1) {
                return [...prevState].filter((item) => {
                    return item != title
                })
            }
            return [...prevState, title]
        })
    }
    return (
        <button
            className={`text-xs rounded-full px-2 py-1 hover:bg-orange-500 hover:text-white active:bg-orange-700 active:text-white m-1 ${
                active
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
            }`}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}
